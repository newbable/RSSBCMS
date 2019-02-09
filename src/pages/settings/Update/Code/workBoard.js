import React, { Component } from 'react'
import { Card,Row,Col ,List,Calendar,Badge,message} from 'antd'
import echarts from 'echarts'
import {homePlay} from '../../../../requests'


import './workBoard.less'
const success=()=>{
  message.success('暂不支持查看页面')
}
function onPanelChange(value, mode) {
  console.log(value, mode);
}
export default class CodeUpdate extends Component {
  constructor(){
    super()
    this.state={
      data:''
    }
  }
  componentDidMount(){
    homePlay()
      .then(resp=>{
        if(resp.data.code===200){
          this.setState({
            data:resp.data.news
          })
        }
      })
    // 基于准备好的dom，初始化echarts实例
 const myChart = echarts.init(document.getElementById('main'))
 const secondChart = echarts.init(document.getElementById('side'))
    // 绘制图表
myChart.setOption({
  color: ['#3398DB'],
  tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis : [
      {
          type : 'category',
          data : ['收案数', '结案数', '存案数'],
          axisTick: {
              alignWithLabel: true
          }
      }
  ],
  yAxis : [
      {
          type : 'value'
      }
  ],
  series : [
      {
          name:'直接访问',
          type:'bar',
          barWidth: '40%',
          data:[ 82, 390, 260]
      }
  ]
});
    secondChart.setOption({
      legend: {},
      tooltip: {},
      dataset: {
          source: [
              ['执案率',  85.8, 93.7],
              ['执勤',  73.4, 55.1],
              ['结案率',  65.2, 82.5]
          ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'bar'},
        {type: 'bar'}
    ]
  })
  }
  render() {
    return (
      <div>
        工作台
        <Row style={{margin:'20px 0'}}>
          <Col span={11}>
            <Card style={{ width: 480,borderRadius:'10px' }} title="信息窗">
            <List
              bordered={false}
              dataSource={this.state.data}
              renderItem={item => (<List.Item style={{border:'none',height:'30px'}}>{item}</List.Item>)}
            />
            </Card>
          </Col>
          <Col span={11} offset={2}>
            <Card style={{ width: 480,borderRadius:'10px',padding:0}} title="个人工作指标">
            <div id="main" style={{width:'50%',height:'200px', float:'left'}}></div>
            <div id="side" style={{width:'50%',height:'200px', float:'left'}}></div>
            </Card>
          </Col>
        </Row>
        <Row style={{margin:'20px 0'}}>
          <Col span={11}>
            <Card style={{ width: 480,borderRadius:'10px' }} title="任务区">
              <ul id="caseKinds">
                <li onClick={success}>
                  <div className="task" style={{background:'red'}}></div>
                  <span className="description">终本案件<i>0</i></span>
                </li>
                <li onClick={success}>
                  <div className="task"style={{background:'green'}}></div>
                  <span className="description">登记立案待立案<i>6</i></span>
                </li>
                <li onClick={success}>
                  <div className="task"style={{background:'blue'}}></div>
                  <span className="description">待恢复立案<i>56</i></span>
                </li>
                <li onClick={success}>
                  <div className="task"style={{background:'gray'}}></div>
                  <span className="description">本案立案庭据签<i>9</i></span>
                </li>
                <li onClick={success}>
                  <div className="task" style={{background:'red'}}></div>
                  <span className="description">终本案件<i>20</i></span>
                </li>
                <li onClick={success}>
                  <div className="task"style={{background:'green'}}></div>
                  <span className="description">登记立案待立案<i>2</i></span>
                </li>
                <li onClick={success}>
                  <div className="task"style={{background:'blue'}}></div>
                  <span className="description">待恢复立案<i>4</i></span>
                </li>
                <li onClick={success}>
                  <div className="task"style={{background:'gray'}}></div>
                  <span className="description">本案立案庭据签<i>3</i></span>
                </li>
                <li onClick={success}>
                  <div className="task"style={{background:'blue'}}></div>
                  <span className="description">待恢复立案<i>8</i></span>
                </li>
                <li onClick={success}>
                  <div className="task"style={{background:'gray'}}></div>
                  <span className="description">本案立案庭据签<i>10</i></span>
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={11} offset={2}>
            <Card style={{ width: 480,borderRadius:'10px' }} title="工作区">
              <ul id="kinds">
                <li onClick={success}>
                  <span>变更承办人</span>
                </li>
                <li onClick={success}>
                  <span>变更承办人(执保)</span>
                </li>
                <li onClick={success}>
                  <span>跨院委托审批</span>
                </li>
                <li onClick={success}>
                  <span>跨省委托审批</span>
                </li>
                <li onClick={success}>
                  <span>限高业务审批</span>
                </li>
                <li onClick={success}>
                  <span>失信名单审核</span>
                </li>
                <li onClick={success}>
                  <span>提交银行申请审批</span>
                </li>
                <li onClick={success}>
                  <span>提交工商申请审批</span>
                </li>
                <li onClick={success}>
                  <span>提交房产申请审批</span>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
        <Row style={{margin:'20px 0'}}>
          <Col span={11}>
            <Card style={{ width: 480,borderRadius:'10px',height:200}} title="预警区">
            <ul id="badge">
            <Badge count={5}>
              <a href="" className="head-example" style={{background:'#333333'}} onClick={success}>1</a>
              <span className="handle">已经到期未办理</span>
            </Badge>
            <Badge count={0} showZero>
              <a href="" className="head-example" style={{background:'red'}} onClick={success}>2</a>
              <span className="handle">距离到期还有1天</span>
            </Badge>
            <Badge count={10}>
              <a href="" className="head-example" style={{background:'blue'}} onClick={success}>3</a>
              <span className="handle">距离到期还有5天</span>
            </Badge>
            <Badge count={15}>
              <a href="" className="head-example" style={{background:'yellowgreen'}} onClick={success}>3</a>
              <span className="handle">距离到期还有15天</span>
            </Badge>
            <Badge count={25}>
              <a href="" className="head-example" style={{background:'yellowgreen'}} onClick={success}>3</a>
              <span className="handle">距离到期还有30天</span>
            </Badge>
            </ul>
            </Card>
          </Col>
          <Col span={11} offset={2}>
            <Card style={{ width: 480,borderRadius:'10px' }} title="个人工作指标">
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
