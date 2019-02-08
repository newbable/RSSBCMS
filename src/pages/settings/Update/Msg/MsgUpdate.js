import React, { Component } from 'react'
import {connect} from 'react-redux'
import './MsgUpdate.less'
import {Form,Input, Tooltip, Icon, Cascader, Select, Row, Col, Button, AutoComplete,message} from 'antd'

const { Option } = Select;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
const success = () => {
  message.success('修改成功');
};
const mapState=(state)=>{
  return {
    username:state.manager.username,
    nation:state.manager.nation,
    nativePlace:state.manager.nativePlace,
    email:state.manager.email,
    address:state.manager.address,
    phone:state.manager.phone,
    Ename:state.manager.Ename,
    position:state.manager.position
  }
}

@connect(mapState)
@Form.create()
export default class MsgUpdate extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        window.localStorage.setItem('usermsg',JSON.stringify(values))
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <div>
        <div className="th" style={{textAlign:'center',margin:'0 auto'}}><span style={{fontSize:'20px'}}>个人基本信息</span></div>
        <div id="update">
        <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入姓名!',
            }],
          })(
            <Input type="text" placeholder={this.props.username}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="民族"
        >
          {getFieldDecorator('nation', {
            rules: [{
              required: true, message: '请输入国籍!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" placeholder={this.props.nation}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="籍贯"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请输入籍贯!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="text" onBlur={this.handleConfirmBlur} placeholder={this.props.nativePlace}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              邮箱&nbsp;
              <Tooltip title="我们会将有关通知发送到您的邮箱">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入邮箱!', whitespace: true }],
          })(
            <Input placeholder={this.props.email}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="家庭通讯地址"
        >
          {getFieldDecorator('residence', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{ type: 'array', required: true, message: '请输入居住地!' }],
          })(
            <Cascader options={residences} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入联系电话!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder={this.props.phone}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="英文名"
        >
          {getFieldDecorator('Ename', {
            rules: [{ required: false, message: '请输入英文名' }],
          })(
            <AutoComplete
            placeholder={this.props.Ename}
            >
              <Input setfieldsvalue={this.props.Ename}/>
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="职位"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: false, message: '请输入验证码!' }],
              })(
                <Input setfieldsvalue={this.props.position}/>
              )}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={success}>确认修改</Button>
        </Form.Item>
      </Form>
        </div>
      </div>
    )
  }
}
