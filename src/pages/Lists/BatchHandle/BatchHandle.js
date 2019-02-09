import React, { Component } from 'react'
import { Table, Menu,Card,Icon,Tag } from 'antd'
import moment from 'moment'
import {caseIn} from '../../../requests'

import './BatchHandle.less'

const columns = [{
  title: '案号',
  dataIndex: 'key',
  render:(text)=>{
    return (<p>浙执{text}号</p>)
  }
}, {
  title: '申请人',
  dataIndex: 'applicant',
}, {
  title: '被执行人',
  dataIndex: 'doman',
  render:(text)=>{
    return (<p>{text}公司</p>)
  }
}, {
  title: '执预承办人',
  dataIndex: 'undertake',
}, {
  title: '立案日期',
  dataIndex: 'date',
  render:(text)=>{
    const date=moment(Number.parseInt(text,10)).format("YYYY-MM-DD")
    return (<p>{date}</p>)
  }
}, {
  title: '操作',
  key: 'operation',
  render:()=>{
    return <Tag>查看</Tag>
  }
}]
export default class BatchHandle extends Component {
  constructor(){
    super()
    this.state = {
      data:[],
      selectedRowKeys: [],
      loading:false,
      currentPage:1,
      pageSize:10,
      totalCount:0,
      totalPage:0
    }
  }

fetchCase=()=>{
  this.setState({
    loading:true
  })
    caseIn({
      limited:this.state.pageSize,
      offset:(this.state.currentPage-1)*this.state.pageSize
    })
      .then(resp=>{
        if(resp.data.code===200){
          this.setState({
            data:resp.data.data,
            currentPage:resp.data.currentPage,
            totalCount:resp.data.totalCount,
            totalPage:resp.data.totalPages,
            loading:false
          })
        }
      })
  }
componentDidMount(){
  this.fetchCase()
}
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handlePageChange=(current,pageSize)=>{
    const currentPage=this.state.pageSize===pageSize?current:1
    this.setState({
      currentPage,
      pageSize
    },()=>{
      this.fetchCase()
    })
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }]
    }
    
    return (
      <div>
        <h3>批量处理</h3>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '80px' }}
            id="caseIn"
          >
            <Menu.Item key="1">
            <Card style={{ width: 260,borderRadius:'5px'  }}>
              <Icon type="check-circle" />
              <p>批量操作(首次分案)</p>
              <span>说明：对一批待分案案件进行分案</span>
            </Card>
            </Menu.Item>
            <Menu.Item key="2">
            <Card style={{ width: 260,borderRadius:'5px'  }}>
            <Icon type="reload" />
              <p>批量操作(普通阶段分案)</p>
              <span>说明：对一批待分案案件进行分案</span>
            </Card>
            </Menu.Item>
            <Menu.Item key="3">
            <Card style={{ width: 260,borderRadius:'5px' }}>
              <Icon type="upload" />
              <p>批量申请延期</p>
              <span>说明：对一批办理案件进行延期申请</span>
            </Card>
            </Menu.Item>
          </Menu>
        
        <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={this.state.data}
        bordered={true}
        loading={this.state.loading}
        pagination={{
          showQuickJumper:true,
          pageSize:this.state.pageSize,
          current:this.state.currentPage,
          total:this.state.totalCount,
          onChange:this.handlePageChange,
          showTotal:()=>{
            return <span>{this.state.currentPage}/{this.state.totalPage}</span>
          }
        }}/>
      </div>
    )
  }
}

