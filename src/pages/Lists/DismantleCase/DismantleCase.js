import React, { Component } from 'react'
import { Table,Tag,Input,Select,Button,message,DatePicker } from 'antd';
import moment from 'moment'
import {dismantleList} from '../../../requests'
import './DismantleCase.less'

const Option = Select.Option;
const success = () => {
  message.success('暂不支持办理');
};
const edit = () => {
  message.success('暂不支持编辑');
};
const fix = () => {
  message.success('暂不支持补正');
};
const backMaterials = () => {
  message.success('暂不支持材料退回');
};
const withdraw = () => {
  message.success('暂不支持申请人主动撤回');
};
const peace = () => {
  message.success('暂不支持立案前化解');
};
const send = () => {
  message.success('暂不支持发送办理');
};
const deleteCase = () => {
  message.success('暂不支持删除');
};
const findCase = () => {
  message.success('暂不支持查询');
};

function onChange(date, dateString) {
  console.log(date, dateString);
}
export default class DismantleCase extends Component {
  columns= [{
    title: '案号',
    dataIndex: 'key',
    render:(text)=>{
      return <span>(2018)浙执{text}号</span>
    }
  },{
    title: '案由',
    dataIndex: 'reason',
    render:(text)=>{
      switch(text){
        case 1:
        return <span>绿化</span>
        case 2:
        return <span>赔偿</span>
        default:
        return <span>拆迁</span>
      }
    }
  }, {
    title: '立案日期',
    dataIndex: 'date',
    render:(text)=>{
      const date=moment(Number.parseInt(text,10)).format("YYYY-MM-DD")
      return <span>{date}</span>
    }
  }, {
    title: '立案人',
    dataIndex: 'applicant'
  },{
    title:'承办部门',
    dataIndex:'undertaker',
    render:()=>{
      return <span>执行局</span>
    }
  }]
  constructor(){
    super()
    this.state={
      dataSource:[],
      pageSize:6,
      currentPage:1,
      totalCount:0,
      totalPages:0,
      isLoding:false
    }
  }
  fatchListData=()=>{
    this.setState({
      isLoding:true
    })
    dismantleList({
      limited:this.state.pageSize,
      offset:(this.state.currentPage-1)*(this.state.pageSize)
    })
      .then(resp=>{
        if(resp.data.code===200){
          // console.log(resp.data)
          this.setState({
            dataSource:resp.data.data,
            totalCount:resp.data.totalCount,
            currentPage:resp.data.currentPage,
            totalPages:resp.data.totalPages,
            isLoding:false
          })
        }
      })
  }
  onTableChange=({current,pageSize})=>{
    const currentPage=this.state.pageSize===pageSize?current:1
    this.setState({
      currentPage,
      pageSize
    },()=>{
      this.fatchListData()
    })
  }
  componentDidMount(){
    this.fatchListData()
  }
  findCase=()=>{
    console.log(111)
  }
  handleTagClick=()=>{
    success()
  }
  render() {
    return (
      <div>
        <h2>拆预收案</h2>
        <div id="findCase">
          <label>
            <span>
              案号:&nbsp;(&nbsp;<Input size="default" style={{width:'100px'}}/>&nbsp;)&nbsp;
            </span>
            </label>
        <span>
          <Select style={{width:'200px'}} defaultValue="浙执">
            <Option value="浙执1">浙执1</Option>
            <Option value="浙执2">浙执2</Option>
            <Option value="浙执3">浙执3</Option>
          </Select>
        </span>
        <label>
          <span>
          &nbsp;第&nbsp;<Input size="default" style={{width:'100px'}}/>&nbsp;号&nbsp;
          </span>
          <label>
            <span>
              立案日期:&nbsp;(&nbsp;<DatePicker onChange={onChange} style={{width:'110px'}}/>&nbsp;)&nbsp;
            </span>
            </label>
        </label>
        <Button style={{marginLeft:'20px'}} type="primary" onClick={findCase}>查询</Button>
        </div>
        <div className="buttons">
          <Button onClick={edit}>编辑</Button>
          <Button onClick={fix}>补正</Button>
          <Button onClick={backMaterials}>材料退回</Button>
          <Button onClick={withdraw}>申请人主动撤回</Button>
          <Button onClick={peace}>立案前化解</Button>
          <Button onClick={send}>发送办理</Button>
          <Button onClick={deleteCase}>删除</Button>
        </div>
        <Table
        bordered
        columns={this.columns}
        dataSource={this.state.dataSource}
        onChange={this.onTableChange}
        loading={this.state.isLoding}
        pagination={{
          pageSize:this.state.pageSize,
          current:this.state.currentPage,
          showQuickJumper:true,
          showSizeChanger:true,
          total:this.state.totalCount,
          showTotal:()=>{
            return <span style={{fontSize:'16px'}}>{this.state.currentPage}/{this.state.totalPages}</span>
          }
        }}
      />
      </div>
    )
  }
}
