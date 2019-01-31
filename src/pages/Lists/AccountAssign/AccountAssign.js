import React, { Component } from 'react'
import { Table, Button,Card,Input } from 'antd';
import { queryList } from '../../../requests'
import { spawn } from 'child_process';

export default class AccountAssign extends Component {
  columns= [{
    title: '案件编号',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '申请人',
    dataIndex: 'applicant', 
  }, {
    title: '执行人',
    dataIndex: 'carrier',   
  }, {
    title: '承办部门',
    dataIndex: 'department',
    render:(text)=>{
      return <span>{text}局</span>
    }
  }, {
    title: '案件状态',
    dataIndex: 'status',
    render:(status)=>{
console.log(typeof(status))
      switch(status){
        case 1:
        return <span>未办理</span>;        
        case 2:
        return <span>办理中</span>;
        case 3:
        return <span>已办理</span>;
        default: return <span>未知</span>;
      }
     
     }
  },{
    title: '操作',
    //key: 'x', 
    render: (text, record, index) => {
      //console.log(record)
      return(
        <Button.Group size='small' >            
              <Button type="primary" >
                查看
              </Button>        
          </Button.Group>
      )
    },
  }
];
  constructor(){
    super()
    this.state={
      dataSource:[],
      isLoding:false
    }
  }
  //获取查询列表的方法
  getQueryList=()=>{
    this.setState({
      isLoding:true
    })
    queryList()
    .then(res=>{
      if(res.data.code===200){
        this.setState({
          dataSource:res.data.data,
          isLoading:false
        })
        console.log(res.data)
      }
    })
  }
 
  componentDidMount(){
  this.getQueryList()
  }
  render() {
    return (
      <div>       
        <Card title="账号分配查询" bordered={false} >
          <p>
          <Input placeholder="请输入案件编号" style={{display:"inlineblock",width: "300px"}}/>
          <Button type="primary" >查询</Button>
          </p>
          <Table 
          columns={this.columns} dataSource={this.state.dataSource} 
          loading={this.isLoading}
          pagination={{
            pageSize:5,
            hideOnSinglePage:true,
            showQuickJumper:true,
            pageSizeOptions	:[
              '5','10'
            ],
            showSizeChanger:true                              
          }}
          />
       </Card>
     
      </div>     
    )
  }
}
