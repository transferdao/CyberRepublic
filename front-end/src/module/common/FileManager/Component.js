import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
  Form, Input, Button, Select, Row, Col, message, Modal, DatePicker,
  Icon, Upload, Table,
} from 'antd'
import I18N from '@/I18N'
import _ from 'lodash'
import { upload_file } from '@/util'
import { getSafeUrl } from '@/util/url'
import moment from 'moment/moment'

import { Container, Title, DeleteLink } from './style'

class C extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      fileList: props.fileList || [],
      fileListUploaded: props.fileListUploaded || [],
    }
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

  getFileList () {
    return this.normFileList(this.state.fileListUploaded).concat(this.state.fileList)
  }

  onChange = (e) => {
    console.log('onChange: ', e)
  }

  renderUploader() {
    // attachment
    const props = {
      accept: '.pdf',
      valuePropName: 'fileList',
      getValueFromEvent: e => (Array.isArray(e) ? e : _.get(e, 'fileList')),
      onChange: this.onChange,
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
    const uploader = (
      <Upload.Dragger name="attachments" {...props}>
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

    return uploader
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

  ord_render() {
    const { data, canManage } = this.props

    return (
      <Container>
        {this.renderFileList()}
      </Container>
    )
  }
}

export default Form.create()(C)
