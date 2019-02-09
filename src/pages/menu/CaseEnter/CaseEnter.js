import React, { Component } from 'react'
import {
  Form, Input, Button, Radio,Select,DatePicker
} from 'antd'

const Option = Select.Option
function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}
function onChange(date, dateString) {
  console.log(date, dateString);
}
const RadioGroup = Radio.Group;

@Form.create()
export default class CaseEnter extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }
  state = {
    value: 1,
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    return (
      <div>
        案件录入
        <Form layout={formLayout} onSubmit={this.handleSubmit} >
          <Form.Item
            label="案件名称"
            {...formItemLayout}
            style={{fontSize:'12px'}}
          >
            
            {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入案件名称!',
            }],
          })(
            <Input placeholder="请输入案件名称" style={{width:'420px'}}/>
          )}
          </Form.Item>
          <Form.Item
            label="案件编号"
            {...formItemLayout}
          >
            <Input placeholder="图书背面右下角条纹码处" style={{width:'420px'}}/>
          </Form.Item>
          <Form.Item
            label="案件类别"
            {...formItemLayout}
          >
            <Select
            showSearch
            style={{ width: 420 }}
            placeholder="请选择"
            optionFilterProp="children"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              <Option value="知识产权">知识产权</Option>
              <Option value="劳动纠纷">劳动纠纷</Option>
              <Option value="交通事故">交通事故</Option>
              <Option value="其它">其它</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="立案人"
            {...formItemLayout}
          >
            <Input placeholder="请输入" style={{width:'420px'}}/>
          </Form.Item>
          <Form.Item
            label="立案时间"
            {...formItemLayout}
          >
            <DatePicker onChange={onChange} style={{width:'420px'}}/>
          </Form.Item>
          <Form.Item
            label="状态"
            {...formItemLayout}
          >
             <RadioGroup onChange={this.onChange} value={this.state.value}>
                <Radio value={1}>立即立案</Radio>
                <Radio value={2}>延迟立案</Radio>
              </RadioGroup>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
