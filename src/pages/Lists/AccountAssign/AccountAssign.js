import React, { Component } from 'react'
import { Table, Button,Card,Input } from 'antd';
import { queryList } from '../../../requests'
//import { spawn } from 'child_process';

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
      var x='';
      switch(status){
        case 1:
        x="未办理";
        break;      
        case 2:
        x="已办理";
        break;  
        case 3:
        x="正在办理";
        break;  
        default: x="未知";
      }
     return <span>{x}</span>;
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
      isLoding:false,
      totalCount:0,
      pageSize:6,//每页显示条数
      currentPage:1,//当前页码
    }
  }
  //获取查询列表的方法
  getQueryList=()=>{
    this.setState({
      isLoding:true
    })
    queryList({
      offset:(this.state.currentPage-1)*this.state.pageSize,
      limited:this.state.pageSize
    })
    .then(res=>{
      if(res.data.code===200){
        this.setState({
          dataSource:res.data.data,
          isLoading:false,
          totalCount:res.data.totalCount,
        })
        console.log(res.data)
      }
    })
  }
 //改变页码时
onTableChange=({current,pageSize})=>{
  console.log(current,pageSize)
  const currentPage=(this.state.pageSize === pageSize) ? current:1
 this.setState({
  currentPage,
  pageSize
 },()=>{
   this.getQueryList()
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
          onChange={this.onTableChange}
          pagination={{
            pageSize:this.state.pageSize,
            //hideOnSinglePage:true,
            showQuickJumper:true,
            current:this.state.currentPage,          
            showSizeChanger:true,
            pageSizeOptions:['6','8','12'],
            total:this.state.totalCount                             
          }}                                     
          />
       </Card>
     
      </div>     
    )
  }
}
