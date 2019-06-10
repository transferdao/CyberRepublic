import React from 'react'
import { Row, Col, Select, Statistic } from 'antd'
import _ from 'lodash'
import BaseComponent from '@/model/BaseComponent'
import I18N from '@/I18N'
import { BIDDING_STATUS } from '@/constant'
import FileManager from '@/module/common/FileManager/Container'

// style related
import styled from 'styled-components'
import { grid } from '../common/variable'

export default class extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  ord_render() {
    const statusNode = this.renderStatus()
    const timerNode = this.renderTimer()
    const uploadNode = this.renderFileManager()
    const submitBtn = this.renderSubmitBtn()
    const notice = this.renderNotice()
    return (
      <Container>
        {statusNode}
        {timerNode}
        {uploadNode}
        {submitBtn}
        {notice}
      </Container>
    )
  }

  handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  renderStatus() {
    const statusObj = I18N.get('bidding.status')
    const { data } = this.props
    const endDate = _.get(this.props, 'data.biddingEndDate')
    const status = Date.now() > endDate ? statusObj[BIDDING_STATUS.SUBMITTING] : statusObj[BIDDING_STATUS.CLOSED]

    return (
      <SectionContainer>
        <SubTitle>{I18N.get('bidding.biddingStatus')}</SubTitle>
        <StatusText>{status}</StatusText>
      </SectionContainer>
    )
  }

  renderTimer() {
    const endDate = _.get(this.props, 'data.biddingEndDate')
    console.log('endDate: ', endDate, typeof endDate)
    return (
      <SectionContainer>
        <Statistic.Countdown title="" value={endDate} />
      </SectionContainer>
    )
  }

  renderFileManager() {
    const fileList = _.get(this.props, 'data.attachments')
    return (
      <SectionContainer>
        <FileManager
          fileList={fileList}
          onChange={this.onFileChange}
          canManage={true}
        />
      </SectionContainer>
    )
  }

  onFileChange = (fileList) => {
    console.log('fileList: ', fileList)
    this.setState({ fileList })
  }

  renderSubmitBtn() {
    return (
      <SectionContainer>
        submit
      </SectionContainer>
    )
  }

  renderNotice() {
    return (
      <SectionContainer>
        Notice after bidding close
      </SectionContainer>
    )
  }
}

export const Container = styled.div`
  @media only screen and (max-width: ${grid.sm}) {
    margin: 15px;
  }
`

export const SectionContainer = styled.div`
  margin: 20px 0;
`

export const SubTitle = styled.div`

`

export const StatusText = styled.span`
  background: #1DE9B6;
  padding: 0 5px;
`

