import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, DatePicker } from 'antd'
import styled from 'styled-components'
import BaseComponent from '@/model/BaseComponent'
import I18N from '@/I18N'
import DatePickerIcon from './DatePickerIcon'
import CloseIcon from './CloseIcon'

const { TextArea } = Input
const FormItem = Form.Item

class MilestoneForm extends BaseComponent {
  handleSubmit = e => {
    e.stopPropagation() // prevent event bubbling
    e.preventDefault()
    const { form, onSubmit, item } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        item ? onSubmit(item.index, values) : onSubmit(values)
      }
    })
  }

  ord_render() {
    const { getFieldDecorator } = this.props.form
    const { item, hidePopover } = this.props
    const formItemLayout = {
      labelCol: {
        span: 24
      },
      wrapperCol: {
        span: 24
      },
      colon: false
    }
    return (
      <Fragment>
        <StyledIcon>
          <CloseIcon onClick={hidePopover} />
        </StyledIcon>
        <Form style={{ width: 330, paddingTop: 24 }}>
          <FormItem
            label={I18N.get('suggestion.plan.publishDate')}
            {...formItemLayout}
          >
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: I18N.get('suggestion.form.error.required')
                }
              ],
              initialValue: item && item.date
            })(
              <DatePicker
                suffixIcon={<DatePickerIcon />}
                placeholder={I18N.get('suggestion.plan.selectDate')}
              />
            )}
          </FormItem>
          <FormItem
            label={I18N.get('suggestion.plan.goal')}
            {...formItemLayout}
          >
            {getFieldDecorator('version', {
              rules: [
                {
                  required: true,
                  message: I18N.get('suggestion.form.error.required')
                }
              ],
              initialValue: item && item.version
            })(<TextArea rows={8} style={{ resize: 'none' }} />)}
          </FormItem>
          <Actions>
            <Button onClick={this.handleSubmit}>
              {item
                ? I18N.get('suggestion.form.button.update')
                : I18N.get('suggestion.form.button.create')}
            </Button>
          </Actions>
        </Form>
      </Fragment>
    )
  }
}

MilestoneForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  item: PropTypes.object
}

export default Form.create()(MilestoneForm)

const Actions = styled.div`
  display: flex;
  justify-content: center;
`
const Button = styled.div`
  margin: -8px 8px 12px;
  background-color: #008d85;
  width: 90px;
  height: 32px;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`
const StyledIcon = styled.div`
  text-align: right;
  cursor: pointer;
`
