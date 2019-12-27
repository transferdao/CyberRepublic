import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Button, Tabs } from 'antd'
import CodeMirrorEditor from '@/module/common/CodeMirrorEditor'
import I18N from '@/I18N'
import moment from 'moment/moment'

const FormItem = Form.Item
const { TabPane } = Tabs

class BudgetForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey:
        props.item && props.item.milestoneKey ? props.item.milestoneKey : '0'
    }
  }

  handleSubmit = e => {
    e.stopPropagation() // prevent event bubbling
    e.preventDefault()
    const { form, onSubmit } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        values.milestoneKey = this.state.activeKey
        onSubmit(values)
      }
    })
  }

  validateAmount = (rule, value, cb) => {
    const reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/
    return (!isNaN(value) && reg.test(value)) || value === '' ? cb() : cb(true)
  }

  handleTabChange = activeKey => {
    this.setState({ activeKey })
  }

  getMilestone = () => {
    let milestone
    const draft = localStorage.getItem('draft-suggestion')
    if (draft) {
      const rs = JSON.parse(draft)
      milestone = rs.plan && rs.plan.milestone
    }

    return milestone
  }

  renderTabText(date) {
    return (
      <TabText className="tab-text">
        {moment(date).format('MMM DD, YYYY')}
      </TabText>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { item } = this.props
    const milestone = this.getMilestone()
    return (
      <Wrapper>
        <Title>{I18N.get('suggestion.budget.create')}</Title>
        <Form onSubmit={this.handleSubmit}>
          <Label>
            <span>*</span>
            {`${I18N.get('suggestion.budget.amount')} (ELA)`}
          </Label>
          <FormItem>
            {getFieldDecorator('amount', {
              rules: [
                {
                  required: true,
                  message: I18N.get('suggestion.form.error.required')
                },
                {
                  message: I18N.get('suggestion.form.error.isNaN'),
                  validator: this.validateAmount
                }
              ],
              initialValue: item && item.amount ? item.amount : ''
            })(<Input />)}
          </FormItem>

          <Label gutter={-8}>
            <span>*</span>
            {I18N.get('suggestion.budget.reasons')}
          </Label>
          <FormItem>
            {getFieldDecorator('reasons', {
              rules: [
                {
                  required: true,
                  message: I18N.get('suggestion.form.error.required')
                }
              ],
              initialValue: item && item.reasons ? item.reasons : ''
            })(
              <CodeMirrorEditor
                content={item && item.reasons ? item.reasons : ''}
                activeKey="reasons"
                name="reasons"
              />
            )}
          </FormItem>

          <Label>
            <span>*</span>
            {I18N.get('suggestion.budget.criteria')}
          </Label>
          <StyledTabs>
            <Desc>{I18N.get('suggestion.budget.desc')}</Desc>
            {milestone && (
              <Tabs
                size="small"
                tabBarGutter={4}
                animated={false}
                activeKey={this.state.activeKey}
                onChange={this.handleTabChange}
              >
                {milestone.map((item, index) => (
                  <TabPane tab={this.renderTabText(item.date)} key={index}>
                    {item.version}
                  </TabPane>
                ))}
              </Tabs>
            )}
          </StyledTabs>
          <FormItem>
            {getFieldDecorator('criteria', {
              rules: [
                {
                  required: true,
                  message: I18N.get('suggestion.form.error.required')
                }
              ],
              initialValue: item && item.criteria ? item.criteria : ''
            })(
              <CodeMirrorEditor
                content={item && item.criteria ? item.criteria : ''}
                activeKey="criteria"
                name="criteria"
              />
            )}
          </FormItem>

          <Actions>
            <Button
              className="cr-btn cr-btn-default"
              onClick={() => {
                this.props.onCancel()
              }}
            >
              {I18N.get('suggestion.cancel')}
            </Button>
            <Button className="cr-btn cr-btn-primary" htmlType="submit">
              {item
                ? I18N.get('suggestion.form.button.update')
                : I18N.get('suggestion.form.button.create')}
            </Button>
          </Actions>
        </Form>
      </Wrapper>
    )
  }
}

BudgetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  item: PropTypes.object
}

export default Form.create()(BudgetForm)

const Wrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;
`
const Label = styled.div`
  font-size: 17px;
  color: #000;
  display: block;
  margin-bottom: ${props => (props.gutter ? props.gutter : 10)}px;
  > span {
    color: #ff0000;
  }
`
const Title = styled.div`
  font-size: 30px;
  line-height: 42px;
  color: #000000;
  text-align: center;
  margin-bottom: 42px;
`
const Desc = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: #000000;
`
const Actions = styled.div`
  display: flex;
  justify-content: center;
  > button {
    margin: 0 8px;
  }
`
const StyledTabs = styled.div`
  .ant-tabs {
    margin-top: 16px;
  }
  .ant-tabs-bar {
    border-bottom: none;
  }
  .ant-tabs-ink-bar {
    height: 1px;
    background-color: #008d85;
  }
  .ant-tabs .ant-tabs-small-bar .ant-tabs-tab {
    padding: 4px 8px;
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    background: rgba(29, 233, 182, 0.1);
    border: 1px solid #008d85;
    border-bottom: none;
    margin-right: 8px !important;
    .tab-text {
      color: #008d85;
      font-weight: 500;
    }
  }
  .ant-tabs-tab-prev.ant-tabs-tab-arrow-show,
  .ant-tabs-tab-next.ant-tabs-tab-arrow-show {
    width: 18px;
  }
  .ant-tabs-tab-prev-icon,
  .ant-tabs-tab-next-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #2a3c57;
    color: #1de9b6;
    line-height: 18px;
  }
`
const TabText = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: rgba(3, 30, 40, 0.3);
  padding-bottom: 2px;
`
