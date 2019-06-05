import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
  Form, Input, Button, Select, Row, Col, message, Modal, DatePicker,
  Icon, Upload, Table,
} from 'antd'
import ReactQuill from 'react-quill'
import { TOOLBAR_OPTIONS } from '@/config/constant'
import I18N from '@/I18N'
import _ from 'lodash'
import { CVOTE_STATUS, CVOTE_STATUS_TEXT } from '@/constant'
import { upload_file } from '@/util'
import { getSafeUrl } from '@/util/url'
import moment from 'moment/moment'

import { Container, Title, DeleteLink } from './style'

const FormItem = Form.Item
const { TextArea } = Input

class C extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      persist: true,
      loading: false,
      fileList: _.get(props, 'data.attachments') || []
    }

    this.user = this.props.user
  }

  ord_loading(f = false) {
    this.setState({ loading: f })
  }

  normFileList (fileList) {
    const result = _.map(fileList, file => {
      console.log('file:', file)
      const { name, type, size, response } = file
      return {
        name,
        filetype: type,
        size,
        url: response,
      }
    })
    return result
  }

  handleSubmit = async (e, fields = {}) => {
    e.preventDefault()
    const fullName = `${this.user.profile.firstName} ${this.user.profile.lastName}`
    const { edit, form, updateCVote, createCVote, onCreated, onEdit, suggestionId } = this.props

    form.validateFields(async (err, values) => {
      if (err) return
      const { title, type, notes, motionId, isConflict, content, biddingEndDate, attachments } = values
      const param = {
        title,
        type,
        notes,
        motionId,
        isConflict,
        content,
        published: true,
        attachments: this.normFileList(attachments).concat(this.state.fileList),
        ...fields,
      }
      if (!edit) param.proposedBy = fullName
      if (suggestionId) param.suggestionId = suggestionId
      if (biddingEndDate) param.biddingEndDate = biddingEndDate

      this.ord_loading(true)
      if (edit) {
        try {
          param._id = edit
          await updateCVote(param)
          this.ord_loading(false)
          await onEdit()
          message.success(I18N.get('from.CVoteForm.message.updated.success'))
        } catch (error) {
          message.error(error.message)
          this.ord_loading(false)
        }
      } else {
        try {
          await createCVote(param)
          this.ord_loading(false)
          await onCreated()
          message.success(I18N.get('from.CVoteForm.message.create.success'))
        } catch (error) {
          message.error(error.message)
          this.ord_loading(false)
        }
      }
    })
  }

  getInputProps(data) {
    const { edit, form } = this.props
    const s = this.props.static
    const { getFieldDecorator } = form

    const title_fn = getFieldDecorator('title', {
      rules: [{ required: true }],
      initialValue: edit ? data.title : _.get(data, 'title', ''),
    })
    const title_el = (
      <Input size="large" type="text" />
    )

    const type_fn = getFieldDecorator('type', {
      rules: [{ required: true }],
      readOnly: true,
      initialValue: edit ? parseInt(data.type, 10) : 1,
    })
    const type_el = (
      <Select>
        {
          _.map(s.select_type, (item, i) => (
            <Select.Option key={i} value={item.code}>{item.name}</Select.Option>
          ))
        }
      </Select>
    )

    const status_fn = getFieldDecorator('status', {
      readOnly: true,
      initialValue: edit ? I18N.get(`cvoteStatus.${data.status}`) : I18N.get(`cvoteStatus.${CVOTE_STATUS_TEXT.DRAFT}`),
    })
    const status_el = (
      <Select disabled={true} />
    )

    const biddingEndDate_fn = getFieldDecorator('biddingEndDate', {
      initialValue: edit ? moment(_.get(data, 'timeline')) : undefined,
    })
    const biddingEndDate_el = (
      <DatePicker size="large" placeholder="" style={{width: '100%'}} />
    )

    const content_fn = getFieldDecorator('content', {
      rules: [{ required: true }],
      initialValue: edit ? data.content : _.get(data, 'content', ''),
    })
    const content_el = (
      <ReactQuill
        placeholder=""
        style={{ background: 'white' }}
        modules={{
          toolbar: TOOLBAR_OPTIONS,
          autoLinks: true,
        }}
      />
    )

    const isConflict_fn = getFieldDecorator('isConflict', {
      initialValue: edit ? data.isConflict : 'NO',
    })
    const isConflict_el = (
      <Select>
        <Select.Option value="NO">{I18N.get('from.CVoteForm.no')}</Select.Option>
        <Select.Option value="YES">{I18N.get('from.CVoteForm.yes')}</Select.Option>
      </Select>
    )

    const notes_fn = getFieldDecorator('notes', {
      initialValue: edit ? data.notes : '',
    })
    const notes_el = (
      <TextArea rows={4} />
    )
    // attachment
    const attachment_fn = getFieldDecorator('attachments', {
      valuePropName: 'fileList',
      getValueFromEvent: e => (Array.isArray(e) ? e : _.get(e, 'fileList')),
      rules: []
    })
    const p_attachment = {
      accept: '.pdf',
      customRequest: ({ file, onSuccess }) => {
        this.setState({
          attachment_loading: true
        })
        upload_file(file).then((d) => {
          this.setState({
            attachment_loading: false,
          })
          onSuccess(d.url, d)
        })
      }
    }
    const attachment_el = (
      <Upload.Dragger name="attachments" {...p_attachment}>
        {this.state.attachment_loading ? (
          <div>
            <p className="ant-upload-text" />
            <p className="ant-upload-text"><Icon type="loading" /></p>
            <p className="ant-upload-hint" />
          </div>
        ) : (
          <div>
            <p className="ant-upload-text">Drag files here</p>
            <p className="ant-upload-text">- or -</p>
            <p className="ant-upload-hint">Click to upload</p>
          </div>
        )}
      </Upload.Dragger>
    )

    const result = {
      title: title_fn(title_el),
      type: type_fn(type_el),
      status: status_fn(status_el),
      content: content_fn(content_el),
      isConflict: isConflict_fn(isConflict_el),
      notes: notes_fn(notes_el),
      attachments: attachment_fn(attachment_el),
    }

    if (form && form.getFieldValue('type') === 4) result.biddingEndDate = biddingEndDate_fn(biddingEndDate_el)

    return result
  }

  renderFileList () {
    const dataSource = this.state.fileList
    const { canManage } = this.props
    const columns = [
      // {
      //   title: I18N.get('from.CVoteForm.fileList.number'),
      //   render: (vid, item, index) => (
      //   ),
      // },
      {
        title: I18N.get('from.CVoteForm.fileList.files'),
        dataIndex: 'name',
        render: (value, item) => (
          <a href={item.url} className="tableLink">
            {value}
          </a>
        ),
      },
      // {
      //   title: I18N.get('from.CVoteForm.fileList.size'),
      //   dataIndex: 'size',
      //   render: (value, item) => value,
      // },
      {
        title: I18N.get('from.CVoteForm.fileList.time'),
        dataIndex: 'createdAt',
        render: (value, item) => moment(value).format('MMM D, YYYY'),
      },
    ]
    const removeCol = {
      title: I18N.get('from.CVoteForm.fileList.actions'),
      dataIndex: '_id',
      render: (value, item) => {
        return <DeleteLink onClick={this.removeFile.bind(this, value)}>{I18N.get('from.CVoteForm.fileList.delete')}</DeleteLink>
      },
    }

    if (canManage) columns.push(removeCol)

    const result = (
      <Table
        columns={columns}
        // loading={this.state.loading}
        dataSource={dataSource}
        rowKey={record => record._id}
      />
    )
    return result
  }

  removeFile = fileId => {
    // remove from fileList
    const newList = _.filter(this.state.fileList, file => file._id !== fileId)
    this.setState({ fileList: newList })
  }

  togglePersist() {
    const { persist } = this.state
    this.setState({ persist: !persist })
  }

  ord_render() {
    const { edit, data, canManage, isSecretary } = this.props
    if (!canManage || (edit && !data)) {
      return null
    }
    const formProps = this.getInputProps(data)

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
      },
      colon: false,
    }
    const formItemLayoutOneLine = {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
      colon: false,
    }

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Title>
            {this.props.header || I18N.get('from.CVoteForm.button.add')}
          </Title>

          <Row gutter={16} type="flex" justify="space-between">
            <Col sm={24} md={11} lg={11}>
              <FormItem label={I18N.get('from.CVoteForm.label.type')} {...formItemLayout}>{formProps.type}</FormItem>
            </Col>
            <Col sm={24} md={11} lg={11}>
              <FormItem label={`${I18N.get('council.voting.ifConflicted')}?`} {...formItemLayout}>{formProps.isConflict}</FormItem>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="space-between">
            <Col sm={24} md={11} lg={11}>
              <FormItem disabled={true} label={I18N.get('from.CVoteForm.label.voteStatus')} {...formItemLayout}>{formProps.status}</FormItem>
            </Col>
            {formProps.biddingEndDate && (
              <Col sm={24} md={11} lg={11}>
                <FormItem
                  label={I18N.get('from.CVoteForm.label.biddingEndDate')} {...formItemLayout}
                  help={I18N.get('from.CVoteForm.label.biddingEndDate.help')}
                >
                  {formProps.biddingEndDate}
                </FormItem>
              </Col>
            )}
          </Row>

          <FormItem label={I18N.get('from.CVoteForm.label.title')} {...formItemLayoutOneLine}>{ formProps.title }</FormItem>

          <FormItem label={I18N.get('from.CVoteForm.label.content')} {...formItemLayoutOneLine}>{formProps.content}</FormItem>

          {isSecretary && <FormItem label={I18N.get('from.CVoteForm.label.note')} {...formItemLayoutOneLine}>{formProps.notes}</FormItem>}

          <FormItem label={I18N.get('from.CVoteForm.label.attachments')} {...formItemLayoutOneLine}>{formProps.attachments}</FormItem>
          {this.renderFileList()}
          <Row gutter={8} type="flex" justify="center">
            {this.renderCancelBtn()}
            {this.renderSaveDraftBtn()}
            {this.renderSaveBtn()}
          </Row>
        </Form>
      </Container>
    )
  }

  gotoList = () => {
    this.props.history.push('/proposals')
  }

  saveDraft = (e) => {
    this.handleSubmit(e, { published: false })
  }

  renderCancelBtn() {
    return (
      <FormItem>
        <Button loading={this.state.loading} onClick={this.props.onCancel} className="cr-btn cr-btn-default" style={{ marginRight: 10 }}>
          {I18N.get('from.CVoteForm.button.cancel')}
        </Button>
      </FormItem>
    )
  }

  renderSaveDraftBtn() {
    const { edit, data } = this.props
    const showButton = !edit || _.get(data, 'status') === CVOTE_STATUS.DRAFT

    return showButton && (
      <FormItem>
        <Button loading={this.state.loading} className="cr-btn cr-btn-primary" onClick={this.saveDraft} style={{ marginRight: 10 }}>
          {I18N.get('from.CVoteForm.button.saveDraft')}
        </Button>
      </FormItem>
    )
  }

  renderSaveBtn() {
    const { edit, data } = this.props
    const btnText = edit && data.published ? I18N.get('from.CVoteForm.button.saveChanges') : I18N.get('from.CVoteForm.button.saveAndPublish')
    return (
      <FormItem>
        <Button loading={this.state.loading} className="cr-btn cr-btn-primary" htmlType="submit">
          {btnText}
        </Button>
      </FormItem>
    )
  }

  finishClick(id) {
    Modal.confirm({
      title: I18N.get('from.CVoteForm.modal.title'),
      content: '',
      okText: I18N.get('from.CVoteForm.modal.confirm'),
      okType: 'danger',
      cancelText: I18N.get('from.CVoteForm.modal.cancel'),
      onOk: () => {
        this.ord_loading(true)
        this.props.finishCVote({
          id,
        }).then(() => {
          message.success(I18N.get('from.CVoteForm.message.proposal.update.success'))
          this.ord_loading(false)
        }).catch((e) => {
          message.error(e.message)
          this.ord_loading(false)
        })
      },
      onCancel() {
      },
    })
  }
}

export default Form.create()(C)
