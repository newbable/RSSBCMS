import React, { Component,createRef } from 'react'
import {Form,Input,Card,Button,DatePicker,message} from 'antd'
import moment from 'moment'
import E from 'wangeditor'
import {editData,saveData} from '../../../requests'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
@Form.create()
export default class CaseDetail extends Component {
  constructor(){
    super()
    this.editorRef=createRef()
    this.state={
      id:'',
      content:''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values.createAt.format('x'))
      if (!err) {
        //将两个对象合并为一个对象，参数是要合并的对象
        const data=Object.assign({},values,{
          createAt:values.createAt.format('x'),
          id:this.state.id
        })
        console.log(data)
        saveData()
          .then(resp=>{
            if(resp.data.code===200){
              message.success(resp.data.msg)
              this.props.history.goBack()
              console.log(this.props)
              //FIX
              // this.props.match.push('/admin/article/edit/:id')
            }
          })
      }
    });
  }
  editInital=()=>{
    const _self=this
    this.editorE=new E(this.editorRef.current)
    this.editorE.customConfig.onchange=function(content){
      _self.setState({
        content
      })
    }
    this.editorE.customConfig.zIndex = 100
    this.editorE.create()
  }
  componentDidMount(){
    this.editInital()
    // 设置初始值
    // this.props.form.setFieldsValue({
    //   createAt:moment()
    // })
    editData(this.props.match.params.id)
      .then(resp=>{
        if(resp.data.code===200){
          this.props.form.setFieldsValue({
            author:resp.data.data.author,
            title:resp.data.data.title,
            createAt:moment(Number.parseInt(resp.data.data.createAt,10))
          })
          this.setState({
            id:resp.data.data.id,
            content:resp.data.data.content
          })
          this.editorE.txt.html(resp.data.data.content)
        }
      })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
         <Card
          title="案件详情"
          bordered={false}
        >
        </Card>
        <Form onSubmit={this.handleSubmit}>
            <Form.Item
              label="案号"
              {...formItemLayout}
            >
              {
                getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入案件编号' }],
                })(
                  <Input placeholder="案件编号"/>
                )
              }
            </Form.Item>
            <Form.Item
              label="案由"
              {...formItemLayout}
            >
              {
                getFieldDecorator('author', {
                  rules: [
                    { 
                      required: true,
                       message: '请输入案由'
                    }
                  ],
                })(
                  <Input placeholder="案由"/>
                )
              }
            </Form.Item>
            <Form.Item
              label="立案时间"
              {...formItemLayout}
            >
              {
                getFieldDecorator('createAt', {
                  // 另一种设置初始值的方式
                  // initialValue:moment(),
                  rules: [{ required: true, message: '请选择立案时间' }],
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )
              }
            </Form.Item>
            <Form.Item
              label="案件详情"
              labelCol={{span:4}}
               wrapperCol={ {span: 18} }
            >
              {
                getFieldDecorator('content', {
                  initialValue:this.state.content
                })(
                  <div ref={this.editorRef}></div>
                )
              }
            </Form.Item>
            <Form.Item
             labelCol={{span:4}}
            >
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
      </div>
    )
  }
}
