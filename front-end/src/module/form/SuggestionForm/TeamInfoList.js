import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'
import I18N from '@/I18N'

class TeamInfoList extends BaseComponent {
  handleDelete = index => {
    this.props.onDelete(index)
  }

  handleEdit = index => {
    this.props.onEdit(index)
  }

  ord_render() {
    const { list, editable } = this.props
    const visible = editable === false ? editable : true
    return (
      <StyledTable>
        <StyledHead>
          <StyledRow>
            <th>{I18N.get('suggestion.plan.teamMember')}</th>
            <th>{I18N.get('suggestion.plan.role')}</th>
            <th>{I18N.get('suggestion.plan.responsibility')}</th>
            <th>{I18N.get('suggestion.plan.moreInfo')}</th>
            {visible && (
              <th style={{ width: 120 }}>
                {I18N.get('suggestion.plan.action')}
              </th>
            )}
          </StyledRow>
        </StyledHead>
        <tbody>
          {list && list.map((item, index) => (
            <StyledRow key={index}>
              <td>{item.member}</td>
              <td>{item.role}</td>
              <td>{item.responsibility}</td>
              <td>{item.info}</td>
              {visible && (
                <td>
                  <Button
                    size="small"
                    type="danger"
                    shape="circle"
                    icon="delete"
                    onClick={this.handleDelete.bind(this, index)}
                  />
                  <Button
                    size="small"
                    type="primary"
                    shape="circle"
                    icon="edit"
                    onClick={this.handleEdit.bind(this, index)}
                  />
                </td>
              )}
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    )
  }
}

TeamInfoList.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  list: PropTypes.array.isRequired,
  editable: PropTypes.bool
}

export default TeamInfoList

const StyledTable = styled.table`
  margin-top: 16px;
  margin-bottom: 48px;
  width: 100%;
  font-size: 13px;
`
const StyledHead = styled.thead`
  > tr {
    background: #0f2631;
  }
  th {
    line-height: 18px;
    padding: 16px;
    color: #fff;
    &:first-child {
      width: 150px;
    }
    &:nth-child(2) {
      width: 150px;
    }
  }
`
const StyledRow = styled.tr`
  width: 100%;
  background: #f2f6fb;
  > td {
    line-height: 18px;
    padding: 16px;
    color: #000;
    > button {
      margin: 0 4px;
    }
  }
`
