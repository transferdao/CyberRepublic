import React from 'react'
import { Modal, Col, Button } from 'antd'
import BaseComponent from '@/model/BaseComponent'
import I18N from '@/I18N'

import { Container } from './style'
import { StyledButton } from '../../suggestion/detail/style'

export default class extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  ord_render() {
    return 'bidding'
  }
}
