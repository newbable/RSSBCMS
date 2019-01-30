import React, { Component } from 'react'
import { Table,Tag,Col,Input,Select } from 'antd';
import moment from 'moment'
// import { Resizable } from 'react-resizable';
import {fatchCaseList} from '../../../requests'
import './CaseList.less'

const Option = Select.Option;
export default class CaseList extends Component {

    columns= [{
      title: '案号',
      dataIndex: 'key',
      render:(text,record)=>{
        return <span>{record.area}{text}号</span>
      }
    }, {
      title: '立案日期',
      dataIndex: 'date',
      render:(text)=>{
        const date=moment(Number.parseInt(text,10)).format("YYYY-MM-DD")
        return <span>{date}</span>
      }
    }, {
      title: '申请人',
      dataIndex: 'applicant'
    }, {
      title: '被执行人',
      dataIndex: 'executor',
      render:(text)=>{
        return <span>{text}公司</span>
      }
    }, {
      title:'承办人',
      dataIndex:'undertaker'
    },{
      title:'法定执照',
      dataIndex:'license',
      render:(text)=>{
        return <span>余{text}天</span>
      }
    },{
      title:'简易/普通',
      dataIndex:''
    },{
      title:'备注',
      dataIndex:''
    },{
      title: '操作',
      key: 'action',
      render: () => (
        <Tag>办理</Tag>
      ),
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
      fatchCaseList({
        limited:this.state.pageSize,
        offset:(this.state.currentPage-1)*(this.state.pageSize)
      })
        .then(resp=>{
          if(resp.data.code===200){
            console.log(resp.data)
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
    };
    render() {   
    return (
      <div>
        <h2>在办案件列表</h2>
        <div id="findCase">
        <Col span={4}>
          <label>
            <Input defaultValue="26888888" size="default"/>
          </label>
        </Col>
        <Col span={6}>
          <Select style={{}} defaultValue="Home">
            <Option value="Home">Home</Option>
            <Option value="Company">Company</Option>
          </Select>
        </Col>
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
