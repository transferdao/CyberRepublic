import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment/moment'
import styled from 'styled-components'
import {
  Pagination,
  Modal,
  Button,
  Col,
  Row,
  Select,
  Spin,
  DatePicker,
  Checkbox,
  Input
} from 'antd'
import rangePickerLocale from 'antd/es/date-picker/locale/zh_CN'
import URI from 'urijs'
import I18N from '@/I18N'
import { loginRedirectWithQuery, logger } from '@/util'
import StandardPage from '@/module/page/StandardPage'
import Footer from '@/module/layout/Footer/Container'
import SuggestionForm from '@/module/form/SuggestionForm/Container'
import ActionsContainer from '../common/actions/Container'
import MetaContainer from '../common/meta/Container'
import TagsContainer from '../common/tags/Container'
import { SUGGESTION_STATUS, SUGGESTION_TAG_TYPE } from '@/constant'
import { breakPoint } from '@/constants/breakPoint'
import MarkdownPreview from '@/module/common/MarkdownPreview'
import { ReactComponent as UpIcon } from '@/assets/images/icon-up.svg'
import { ReactComponent as DownIcon } from '@/assets/images/icon-down.svg'
import PageHeader from './PageHeader'
import SearchBox from './SearchBox'

import './style.scss'

const { RangePicker } = DatePicker

const SORT_BY = {
  createdAt: 'createdAt',
  likesNum: 'likesNum',
  activeness: 'activeness',
  viewsNum: 'viewsNum'
}
const DEFAULT_SORT = SORT_BY.createdAt

const BUDGET_REQUESTED_OPTIONS = {
  1: { value: '$0 - $100 (USD)', budgetLow: 0, budgetHigh: 100 },
  2: { value: '$100 - $1000 (USD)', budgetLow: 100, budgetHigh: 1000 },
  3: { value: '> $1000 (USD)', budgetLow: 1000 }
}

/**
 * This uses new features such as infinite scroll and pagination, therefore
 * we do some different things such as only loading the data from the server
 */
export default class extends StandardPage {
  constructor(props) {
    super(props)

    const uri = URI(props.location.search || '')

    // we use the props from the redux store if its retained
    this.state = {
      showForm: uri.hasQuery('create'),
      showArchived: false,

      // named status since we eventually want to use a struct of statuses to filter on
      referenceStatus: false,
      infoNeeded: false,
      underConsideration: false,
      isDropdownActionOpen: false,
      showMobile: false,
      results: 10,
      total: 0,
      search: '',
      filter: '',
      status: '',
      budgetRequested: '',
      creationDate: [],
      author: '',
      type: ''
    }
    this.debouncedRefetch = _.debounce(this.refetch.bind(this), 300)
  }

  componentDidMount() {
    super.componentDidMount()
    this.refetch()
  }

  componentWillUnmount() {
    this.props.resetAll()
  }

  handleFilter = () => {
    const { isVisitableFilter } = this.state
    this.setState({ isVisitableFilter: !isVisitableFilter })
  }

  handleStatusChange = status => {
    this.setState({ status })
  }

  handleBudgetRequestedChange = budgetRequested => {
    this.setState({ budgetRequested })
  }

  handleUnderConsiderationChange = e => {
    this.setState({ underConsideration: e.target.checked })
  }

  handleInfoNeededChange = e => {
    this.setState({ infoNeeded: e.target.checked })
  }

  handleReferenceStatusChange = e => {
    this.setState({ referenceStatus: e.target.checked })
  }

  handleCreationDateChange = creationDate => {
    this.setState({ creationDate })
  }

  handleAuthorChange = e => {
    this.setState({ author: e.target.value })
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  handleClearFilter = () => {
    this.setState({
      referenceStatus: false,
      infoNeeded: false,
      underConsideration: false,
      search: '',
      filter: '',
      status: '',
      budgetRequested: '',
      creationDate: [],
      author: '',
      type: ''
    })
  }

  handleApplyFilter = () => {
    this.refetch()
  }

  handleExportAsCSV = () => {
    const { exportAsCSV } = this.props
    const query = this.getQuery()
    exportAsCSV(query).then(response => {
      window.location.href = URL.createObjectURL(response)
    })
  }

  ord_renderContent() {
    const { isVisitableFilter } = this.state
    const { isSecretary } = this.props
    const headerNode = this.renderHeader()
    const filterNode = this.renderFilters()
    const filterPanel = this.renderFilterPanel()
    const createForm = this.renderCreateForm()
    const listNode = this.renderList()
    const sortActionsNode = this.renderSortActions()

    return (
      <div>
        <div className="suggestion-header">{headerNode}</div>
        <SuggestionContainer className="p_SuggestionList">
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ margin: '24px 0 48px' }}
          >
            <Col xs={24} sm={12} style={{ paddingTop: 24 }}>
              <SearchBox search={this.handleSearch} value={this.state.search} />
            </Col>
            {filterNode}
            <Col xs={24} sm={8} style={{ textAlign: 'right', paddingTop: 24 }}>
              <Button
                onClick={this.showCreateForm}
                className="btn-create-suggestion"
              >
                {I18N.get('suggestion.add')}
              </Button>
            </Col>
          </Row>
          {isVisitableFilter && filterPanel}
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ borderBottom: '1px solid #E5E5E5' }}
          >
            <Col md={24} xl={18} style={{ paddingBottom: 24 }}>
              {sortActionsNode}
            </Col>
            <Col
              md={24}
              xl={6}
              style={{ paddingBottom: 24, textAlign: 'right' }}
            >
              <Button
                type="link"
                className="btn-link"
                onClick={this.toggleArchivedList}
              >
                {this.state.showArchived === false
                  ? I18N.get('suggestion.viewArchived')
                  : I18N.get('suggestion.viewAll')}
              </Button>
              {isSecretary && <SplitLabel />}
              {isSecretary && (
                <Button
                  type="link"
                  className="btn-link"
                  onClick={this.handleExportAsCSV}
                >
                  {I18N.get('elip.button.exportAsCSV')}
                </Button>
              )}
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: 32 }}>
            <Col span={24}>{listNode}</Col>
          </Row>
          {createForm}
        </SuggestionContainer>
        <Footer />
      </div>
    )
  }

  handleSearch = (filter, search) => {
    this.setState({ search, filter }, this.debouncedRefetch)
  }

  onFormSubmit = async param => {
    try {
      await this.props.create(param)
      this.setState({ showForm: false })
      this.refetch()
    } catch (error) {
      logger.error(error)
    }
  }

  renderCreateForm = () => {
    const props = {
      onCancel: this.hideCreateForm,
      onSubmit: this.onFormSubmit
    }

    return (
      <Modal
        className="project-detail-nobar"
        maskClosable={false}
        visible={this.state.showForm}
        onCancel={this.hideCreateForm}
        footer={null}
        width="70%"
      >
        {this.state.showForm && <SuggestionForm {...props} />}
      </Modal>
    )
  }

  showCreateForm = () => {
    const { isLogin, history } = this.props
    if (!isLogin) {
      const query = { create: true }
      loginRedirectWithQuery({ query })
      history.push('/login')
      return
    }
    this.props.history.push('/suggestion/create')
  }

  hideCreateForm = () => {
    this.setState({ showForm: false })
  }

  toggleArchivedList = async () => {
    await this.setState(prevState => ({
      showArchived: !prevState.showArchived,

      // go back to page 1 on toggle
      page: 1,
      results: 10,
      total: 0
    }))

    this.refetch()
  }

  renderHeader() {
    return (
      <div>
        <SuggestionContainer className="title komu-a cr-title-with-icon">
          {this.props.header || I18N.get('suggestion.title').toUpperCase()}
        </SuggestionContainer>

        <HeaderDiagramContainer>
          <SuggestionContainer>
            <PageHeader />
            <HeaderDesc>
              {I18N.get('suggestion.intro.1')}
              <Link to="/proposals">
                {I18N.get('suggestion.intro.1.proposals')}
              </Link>
              {I18N.get('suggestion.intro.1.1')}
              <br />
              <br />
              {I18N.get('suggestion.intro.3')}
              {localStorage.getItem('lang') === 'en' ? (
                <a
                  href="https://www.cyberrepublic.org/docs/#/guide/suggestions"
                  target="_blank"
                >
                  https://www.cyberrepublic.org/docs/#/guide/suggestions
                </a>
              ) : (
                <a
                  href="https://www.cyberrepublic.org/docs/#/zh/guide/suggestions"
                  target="_blank"
                >
                  https://www.cyberrepublic.org/docs/#/zh/guide/suggestions
                </a>
              )}
            </HeaderDesc>
          </SuggestionContainer>
        </HeaderDiagramContainer>
      </div>
    )
  }

  renderSortActions() {
    const SORT_BY_TEXT = {
      createdAt: I18N.get('suggestion.new'),
      likesNum: I18N.get('suggestion.likes'),
      viewsNum: I18N.get('suggestion.mostViews'),
      activeness: I18N.get('suggestion.activeness')
    }
    const sortBy = this.props.sortBy || DEFAULT_SORT
    return (
      <div>
        {I18N.get('suggestion.sort')}:{' '}
        <Select
          name="type"
          style={{ width: 200, marginLeft: 16 }}
          onChange={this.onSortByChanged}
          value={sortBy}
        >
          {_.map(SORT_BY, value => (
            <Select.Option key={value} value={value}>
              {SORT_BY_TEXT[value]}
            </Select.Option>
          ))}
        </Select>
      </div>
    )
  }

  renderFilters() {
    const { isVisitableFilter } = this.state
    return (
      <FilterLabel xs={24} sm={2} style={{ paddingTop: 24 }}>
        <Row
          type="flex"
          gutter={10}
          align="middle"
          justify="start"
          onClick={this.handleFilter}
        >
          <Col>{I18N.get('elip.fields.filter')}</Col>
          <Col>{isVisitableFilter ? <UpIcon /> : <DownIcon />}</Col>
        </Row>
      </FilterLabel>
    )
  }

  renderFilterPanel() {
    const {
      referenceStatus,
      infoNeeded,
      underConsideration,
      status,
      budgetRequested,
      creationDate,
      author,
      type
    } = this.state
    const typeMap = {
      1: I18N.get('suggestion.form.type.newMotion'),
      2: I18N.get('suggestion.form.type.motionAgainst'),
      3: I18N.get('suggestion.form.type.anythingElse')
    }
    const lang = localStorage.getItem('lang') || 'en'
    const rangePickerOptions = {}
    if (lang === 'zh') {
      rangePickerOptions.locale = rangePickerLocale
    }
    return (
      <FilterPanel>
        <Row type="flex" gutter={10} className="filter">
          <Col span={8} className="filter-panel">
            <FilterContent>
              <FilterItem>
                <FilterItemLabel>
                  {I18N.get('suggestion.fields.status')}
                </FilterItemLabel>
                <FilterItmeInput>
                  <Select
                    value={status}
                    onChange={this.handleStatusChange}
                    style={{ width: '100%' }}
                  >
                    {_.map(SUGGESTION_STATUS, value => (
                      <Select.Option key={value} value={value}>
                        {I18N.get(`suggestion.status.${value}`)}
                      </Select.Option>
                    ))}
                  </Select>
                </FilterItmeInput>
              </FilterItem>
              <FilterItem>
                <FilterItemLabel>
                  {I18N.get('suggestion.fields.budgetRequested')}
                </FilterItemLabel>
                <FilterItmeInput>
                  <Select
                    value={budgetRequested}
                    onChange={this.handleBudgetRequestedChange}
                    style={{ width: '100%' }}
                  >
                    {_.map(BUDGET_REQUESTED_OPTIONS, (item, key) => (
                      <Select.Option key={key} value={key}>
                        {item.value}
                      </Select.Option>
                    ))}
                  </Select>
                </FilterItmeInput>
              </FilterItem>
            </FilterContent>
          </Col>
          <Col span={8} className="filter-panel">
            <FilterContent>
              <FilterItem className="filter-checkbox">
                <Checkbox
                  checked={underConsideration}
                  onChange={this.handleUnderConsiderationChange}
                />
                <CheckboxText>
                  {I18N.get('suggestion.tag.type.UNDER_CONSIDERATION')}
                </CheckboxText>
              </FilterItem>
              <FilterItem className="filter-checkbox">
                <Checkbox
                  checked={infoNeeded}
                  onChange={this.handleInfoNeededChange}
                />
                <CheckboxText>
                  {I18N.get('suggestion.tag.type.INFO_NEEDED')}
                </CheckboxText>
              </FilterItem>
              <FilterItem className="filter-checkbox">
                <Checkbox
                  checked={referenceStatus}
                  onChange={this.handleReferenceStatusChange}
                />
                <CheckboxText>
                  {I18N.get('suggestion.tag.type.ADDED_TO_PROPOSAL')}
                </CheckboxText>
              </FilterItem>
            </FilterContent>
          </Col>
          <Col span={8} className="filter-panel">
            <FilterContent>
              <FilterItem>
                <FilterItemLabel>
                  {I18N.get('suggestion.fields.creationDate')}
                </FilterItemLabel>
                <FilterItmeInput>
                  <RangePicker
                    onChange={this.handleCreationDateChange}
                    value={creationDate}
                    {...rangePickerOptions}
                  />
                </FilterItmeInput>
              </FilterItem>
              <FilterItem>
                <FilterItemLabel>
                  {I18N.get('suggestion.fields.author')}
                </FilterItemLabel>
                <FilterItmeInput>
                  <Input value={author} onChange={this.handleAuthorChange} />
                </FilterItmeInput>
              </FilterItem>
              <FilterItem>
                <FilterItemLabel>
                  {I18N.get('suggestion.fields.type')}
                </FilterItemLabel>
                <FilterItmeInput>
                  <Select
                    value={type}
                    onChange={this.handleTypeChange}
                    style={{ width: '100%' }}
                  >
                    {_.map(typeMap, (value, key) => (
                      <Select.Option key={key} value={key}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </FilterItmeInput>
              </FilterItem>
            </FilterContent>
          </Col>
        </Row>
        <Row type="flex" gutter={30} justify="center" className="filter-btn">
          <Col>
            <FilterClearBtn onClick={this.handleClearFilter}>
              {I18N.get('elip.button.clearFilter')}
            </FilterClearBtn>
          </Col>
          <Col>
            <Button
              className="cr-btn cr-btn-primary"
              onClick={this.handleApplyFilter}
            >
              {I18N.get('elip.button.applyFilter')}
            </Button>
          </Col>
        </Row>
      </FilterPanel>
    )
  }

  onInfoNeededChange = async e => {
    const { onTagsIncludedChanged, tagsIncluded, changePage } = this.props
    tagsIncluded.infoNeeded = e.target.checked

    await changePage(1)
    await onTagsIncludedChanged(tagsIncluded)
    await this.refetch()
  }

  onUnderConsiderationChange = async e => {
    const { onTagsIncludedChanged, tagsIncluded, changePage } = this.props
    tagsIncluded.underConsideration = e.target.checked

    await changePage(1)
    await onTagsIncludedChanged(tagsIncluded)
    await this.refetch()
  }

  // checked = boolean
  onReferenceStatusChange = async e => {
    const { onReferenceStatusChanged } = this.props

    // the first onReferenceStatusChanged is the props fn from Container
    await this.setState({ referenceStatus: e.target.checked })
    await onReferenceStatusChanged(e.target.checked)
    await this.refetch()
  }

  renderList() {
    const { dataList, loading } = this.props
    const loadingNode = (
      <div className="center">
        <Spin size="large" />
      </div>
    )
    const paginationNode = this.renderPagination()
    let result = loadingNode
    if (!loading) {
      if (_.isEmpty(dataList)) {
        result = <NoData>{I18N.get('suggestion.nodata')}</NoData>
      } else {
        result = _.map(dataList, data => this.renderItem(data))
      }
    }

    return (
      <div>
        <div className="list-container">{result}</div>
        {paginationNode}
      </div>
    )
  }

  renderItem = data => {
    const href = `/suggestion/${data._id}`
    const actionsNode = this.renderActionsNode(data, this.refetch)
    const metaNode = this.renderMetaNode(data)
    const title = <ItemTitle to={href}>{data.title}</ItemTitle>
    const tagsNode = this.renderTagsNode(data)
    return (
      <div key={data._id} className="item-container">
        {metaNode}
        {title}
        {tagsNode}
        <ShortDesc>
          <MarkdownPreview content={data.abstract} />
          {_.isArray(data.link) &&
            data.link.map(link => {
              return (
                <ItemLinkWrapper key={link}>
                  <a target="_blank" href={link}>
                    {link}
                  </a>
                </ItemLinkWrapper>
              )
            })}
        </ShortDesc>

        {actionsNode}
      </div>
    )
  }

  onPageChanged = page => {
    const { changePage } = this.props
    changePage(page)
    this.loadPage(page)
  }

  renderPagination() {
    const { total, page } = this.props
    const { results } = this.state
    const props = {
      pageSize: results,
      total,
      current: page,
      onChange: this.onPageChanged
    }
    return <Pagination {...props} className="cr-pagination" />
  }

  renderMetaNode = detail => (
    <MetaContainer data={detail} user={this.props.user} />
  )

  renderTagsNode = detail => <TagsContainer data={detail} />

  renderActionsNode = (detail, refetch) => (
    <ActionsContainer data={detail} listRefetch={refetch} />
  )

  onSortByChanged = async sortBy => {
    await this.props.onSortByChanged(sortBy)
    await this.refetch()
  }

  /**
   * Builds the query from the current state
   */
  getQuery = () => {
    const sortBy = this.props.sortBy || DEFAULT_SORT
    const { page } = this.props
    const {
      results,
      referenceStatus,
      search,
      filter,
      status,
      infoNeeded,
      underConsideration,
      budgetRequested,
      creationDate,
      author,
      type
    } = this.state
    const query = {
      status: this.state.showArchived
        ? SUGGESTION_STATUS.ARCHIVED
        : SUGGESTION_STATUS.ACTIVE,
      page,
      results
    }
    let included = ''

    if (infoNeeded) {
      included = SUGGESTION_TAG_TYPE.INFO_NEEDED
    }
    if (underConsideration) {
      if (_.isEmpty(included)) {
        included = SUGGESTION_TAG_TYPE.UNDER_CONSIDERATION
      } else {
        included = `${included},${SUGGESTION_TAG_TYPE.UNDER_CONSIDERATION}`
      }
    }

    if (!_.isEmpty(included)) {
      query.tagsIncluded = included
    }

    // sending a boolean to be handled by the backend
    query.referenceStatus = referenceStatus

    if (!_.isEmpty(status)) {
      query.status = status
    }

    if (!_.isEmpty(budgetRequested) && budgetRequested > 0) {
      const budget = BUDGET_REQUESTED_OPTIONS[budgetRequested]
      query.budgetLow = budget.budgetLow
      if (budget.budgetHigh) {
        query.budgetHigh = budget.budgetHigh
      }
    }

    if (!_.isEmpty(creationDate)) {
      const formatStr = 'YYYY-MM-DD'
      query.startDate = moment(creationDate[0]).format(formatStr)
      query.endDate = moment(creationDate[1]).format(formatStr)
    }

    if (!_.isEmpty(author)) {
      query.author = author
    }

    if (!_.isEmpty(type)) {
      query.type = type
    }

    // TODO
    if (sortBy) {
      query.sortBy = sortBy
    }

    if (search) {
      query.search = search
    }

    if (filter) {
      query.filter = filter
    }
    return query
  }

  /**
   * Refetch the data based on the current state retrieved from getQuery
   */
  refetch = () => {
    const query = this.getQuery()
    this.props.getList(query)
  }

  loadPage = async page => {
    const query = {
      ...this.getQuery(),
      page,
      results: this.state.results
    }

    this.setState({ loadingMore: true })

    try {
      await this.props.loadMore(query)
    } catch (e) {
      // Do not update page in state if the call fails
      logger.error(e)
    }

    this.setState({ loadingMore: false })
  }

  gotoDetail(id) {
    this.props.history.push(`/suggestion/${id}`)
  }
}

const HeaderDiagramContainer = styled.div`
  background-color: #162f45;
  padding-top: 36px;
  padding-bottom: 36px;
  img {
    max-height: 250px;
    @media only screen and (max-width: ${breakPoint.lg}) {
      width: 100%;
    }
  }
`

const ItemTitle = styled(Link)`
  font-size: 20px;
  color: black;
  transition: all 0.3s;
  font-weight: 400;
  text-decoration: none;
  margin: 8px 0;
  display: block;
  &:hover {
    color: $link_color;
  }
`

const ItemLinkWrapper = styled.div`
  margin-top: 8px;
  display: block;
`

const ShortDesc = styled.div`
  margin-top: 8px;
  font-weight: 200;
  .md-RichEditor-editor .public-DraftEditor-content {
    min-height: 10px;
  }
  .md-RichEditor-root {
    padding: 0;
    figure.md-block-image {
      background: none;
    }
    figure.md-block-image figcaption .public-DraftStyleDefault-block {
      text-align: left;
    }
    .public-DraftEditor-content {
      padding: 0px 15px;
    }
  }
`

const HeaderDesc = styled.div`
  font-weight: 200;
  padding: 24px 0;
  color: #fff;
  word-break: break-all;
`

const SuggestionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media only screen and (max-width: ${breakPoint.xl}) {
    margin: 0 5%;
  }
`

const CheckboxText = styled.span`
  margin-left: 10px;
`

const NoData = styled.div`
  text-align: center;
  padding: 25px 0;
`

const FilterLabel = styled(Col)`
  color: #008d85;
  cursor: pointer;
`

const FilterPanel = styled.div`
  .filter {
    margin-top: 20px;
  }
  .filter-btn {
    margin-top: 36px;
    margin-bottom: 58px;
  }
`

const FilterClearBtn = styled.div`
  text-align: center;
  min-width: 155px;
  height: 40px;
  line-height: 40px;
  color: rgba(3, 30, 40, 0.3);
  cursor: pointer;
`

const FilterItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
  &.filter-checkbox {
    padding-left: 15px;
    padding-top: 10px;
  }
  :first-child {
    padding-top: 20px;
  }
  :last-child {
    padding-bottom: 20px;
  }
`
const FilterContent = styled.div`
  background: #f6f9fd;
  height: 100%;
`

const FilterItemLabel = styled.div`
  width: 40%;
  padding-left: 15px;
  font-family: Synthese;
  font-size: 14px;
  line-height: 20px;
  color: #000;

  :after {
    content: ':';
  }
`

const FilterItmeInput = styled.div`
    width: 60%;
    padding-right: 15px;
`

const SplitLabel = styled.span`
  color: rgba(3, 30, 40, 0.3);
  :after {
    content: '|';
  }
`
