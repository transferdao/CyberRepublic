import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BaseComponent from '@/model/BaseComponent'
import I18N from '@/I18N'
import MarkdownPreview from '@/module/common/MarkdownPreview'
import DeleteSvgIcon from '@/module/common/DeleteSvgIcon'
import EditSvgIcon from '@/module/common/EditSvgIcon'

class PaymentList extends BaseComponent {
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
            <th>{I18N.get('suggestion.budget.payment')}#</th>
            <th>{I18N.get('suggestion.budget.type')}</th>
            <th>{I18N.get('suggestion.budget.amount')}(ELA)</th>
            <th>{I18N.get('suggestion.budget.reasons')}</th>
            <th>{I18N.get('suggestion.budget.criteria')}</th>
            {visible && (
              <th style={{ width: 110 }}>
                {I18N.get('suggestion.budget.action')}
              </th>
            )}
          </StyledRow>
        </StyledHead>
        <tbody>
          {list &&
            list.map((item, index) => (
              <StyledRow key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.type ? I18N.get(`suggestion.budget.${item.type}`) : ''}
                </td>
                <td>{item.amount}</td>
                <td>
                  <MarkdownPreview
                    content={item.reasons ? item.reasons : ''}
                    style={{ p: { margin: '1em 0' } }}
                  />
                </td>
                <td>
                  <MarkdownPreview
                    content={item.criteria ? item.criteria : ''}
                    style={{ p: { margin: '1em 0' } }}
                  />
                </td>
                {visible && (
                  <td>
                    <EditSvgIcon
                      type="edit"
                      onClick={this.handleEdit.bind(this, index)}
                      style={{ marginRight: 22, cursor: 'pointer' }}
                    />
                    <DeleteSvgIcon
                      type="delete"
                      onClick={this.handleDelete.bind(this, index)}
                      style={{ cursor: 'pointer' }}
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

PaymentList.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  list: PropTypes.array,
  editable: PropTypes.bool
}

export default PaymentList

const StyledTable = styled.table`
  margin-top: 16px;
  width: 100%;
  font-size: 13px;
  table-layout: auto;
`
const StyledHead = styled.thead`
  > tr {
    background: #0f2631;
  }
  th {
    line-height: 18px;
    padding: 16px;
    color: #fff;
  }
`
const StyledRow = styled.tr`
  width: 100%;
  background: #f2f6fb;
  > td {
    line-height: 18px;
    padding: 8px 16px;
    color: #000;
    overflow-wrap: break-word;
    > button {
      margin: 0 4px;
    }
  }
`
