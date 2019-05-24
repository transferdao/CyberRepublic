import React from 'react'
import { Row, Col, Select } from 'antd'
import _ from 'lodash'
import BaseComponent from '@/model/BaseComponent'
import I18N from '@/I18N'
import { BIDDING_STATUS } from '@/constant'

export default class extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  ord_render() {
    const statusNode = this.renderStatus()
    const timerNode = this.renderTimer()
    const uploadNode = this.renderUpload()
    const fileListNode = this.renderFileList()
    return (
      <div>
        {statusNode}
        {timerNode}
        {uploadNode}
        {fileListNode}
      </div>
    )
  }


  handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  renderStatus() {
    const statusObj = I18N.get('bidding.status')
    const options = _.map(statusObj, (value, index) => {
      return (
        <Select.Option key={index} value={index}>
          {value}
        </Select.Option>
      )
    })

    return (
      <div>
        <Select style={{ width: 200 }} defaultValue={BIDDING_STATUS.NOT_NEEDED} onChange={this.handleChange}>
          {options}
        </Select>
      </div>
    )
  }

  renderTimer() {
    return (
      <div>
        abc
      </div>
    )
  }

  renderUpload() {
    return (
      <div>
        abc
      </div>
    )
  }

  renderFileList() {
    return (
      <div>
        abc
      </div>
    )
  }
}
