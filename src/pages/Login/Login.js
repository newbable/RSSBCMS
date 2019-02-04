import React, { Component } from 'react'
import {
  Form, Icon, Input, Button, Checkbox,Row,Col,Spin
} from 'antd';
import './Login.less'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {doLogin} from '../../actions/user'

const mapStateTOProps=state=>{
  console.log(state.user)
  return {
    isLoding:state.global.isLoding,
    isLogin:state.user.isLogin
  }
}
@connect(mapStateTOProps,{doLogin})
@Form.create()
export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 当输入框验证通过后，处理登录事件
        this.props.doLogin(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin
       ?
       <Redirect to="/admin/home"/>
       :
      <div id="login">
      <Spin spinning={this.props.isLoding}>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <h1>RSSB后台管理系统登录</h1>
        <Row >
          <Col span={12} offset={6}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a className="login-form-forgot" href="" style={{paddingLeft:'5px'}}>忘记密码</a>
          </Col>
        </Row>
      </Form>
      </Spin>
      </div>
      
    )
  }
}
