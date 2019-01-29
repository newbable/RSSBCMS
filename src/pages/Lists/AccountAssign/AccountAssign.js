import React, { Component } from 'react'
import { Table, Button,Card,Input } from 'antd';
import { queryList } from '../../../requests'

export default class AccountAssign extends Component {
  columns= [{
    title: '案件编号',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '申请人',
    dataIndex: 'asker',
    key: 'asker',
  }, {
    title: '执行人',
    dataIndex: 'carrier',
    key: 'carrier',
  }, {
    title: '承办部门',
    key: 'department',
    dataIndex: 'department',
  }, {
    title: '案件状态',
    key: 'status',
    dataIndex: 'status',
    // render:()=>{

    // }
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'x', 
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
      data:[
        {
          key: '1',
          id:'12',
          asker: '张磊',
          carrier: '李梅',
          department: '民政局',
          status: '完成',
        }, {
          key: '2',
          id:'123',
          asker: '张磊',
          carrier: '李梅',
          department: '民政局',
          status: '完成',
        }
      ]
    }
  }
  //获取查询列表的方法
  getQueryList=()=>{
    queryList()
    .then(res=>{
      if(res.data.code===200){
        this.setState({
          data:res.data.data
        })
        console.log(res.data)
      }
    })
  }
 
  componentDidMount(){
  //this.getQueryList()
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
          columns={this.columns} dataSource={this.state.data} 

          />
       </Card>
     
      </div>
    )
  }
}
