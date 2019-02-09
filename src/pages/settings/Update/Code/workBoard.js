import React, { Component } from 'react'
import { Card,Row,Col ,List,Calendar,Badge} from 'antd'
import echarts from 'echarts'


import './workBoard.less'
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]
function onPanelChange(value, mode) {
  console.log(value, mode);
}
export default class CodeUpdate extends Component {
  componentDidMount(){
    // 基于准备好的dom，初始化echarts实例
 const myChart = echarts.init(document.getElementById('main'))
 const secondChart = echarts.init(document.getElementById('side'))
    // 绘制图表
    myChart.setOption({
      title: {
          text: ''
      },
      tooltip: {},
      xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  })
    secondChart.setOption({
      title: {
          text: ''
      },
      tooltip: {},
      xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
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
              dataSource={data}
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
                <li>
                  <div className="task" style={{background:'red'}}></div>
                  <span className="description">终本案件<i>0</i></span>
                </li>
                <li>
                  <div className="task"style={{background:'green'}}></div>
                  <span className="description">登记立案待立案<i>6</i></span>
                </li>
                <li>
                  <div className="task"style={{background:'blue'}}></div>
                  <span className="description">待恢复立案<i>56</i></span>
                </li>
                <li>
                  <div className="task"style={{background:'gray'}}></div>
                  <span className="description">本案立案庭据签<i>9</i></span>
                </li>
                <li>
                  <div className="task" style={{background:'red'}}></div>
                  <span className="description">终本案件<i>20</i></span>
                </li>
                <li>
                  <div className="task"style={{background:'green'}}></div>
                  <span className="description">登记立案待立案<i>2</i></span>
                </li>
                <li>
                  <div className="task"style={{background:'blue'}}></div>
                  <span className="description">待恢复立案<i>4</i></span>
                </li>
                <li>
                  <div className="task"style={{background:'gray'}}></div>
                  <span className="description">本案立案庭据签<i>3</i></span>
                </li>
                <li>
                  <div className="task"style={{background:'blue'}}></div>
                  <span className="description">待恢复立案<i>8</i></span>
                </li>
                <li>
                  <div className="task"style={{background:'gray'}}></div>
                  <span className="description">本案立案庭据签<i>10</i></span>
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={11} offset={2}>
            <Card style={{ width: 480,borderRadius:'10px' }} title="工作区">
              <ul id="kinds">
                <li>
                  <span>变更承办人</span>
                </li>
                <li>
                  <span>变更承办人(执保)</span>
                </li>
                <li>
                  <span>跨院委托审批</span>
                </li>
                <li>
                  <span>跨省委托审批</span>
                </li>
                <li>
                  <span>限高业务审批</span>
                </li>
                <li>
                  <span>失信名单审核</span>
                </li>
                <li>
                  <span>提交银行申请审批</span>
                </li>
                <li>
                  <span>提交工商申请审批</span>
                </li>
                <li>
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
              <a href="" className="head-example" style={{background:'#333333'}}>1</a>
              <span className="handle">已经到期未办理</span>
            </Badge>
            <Badge count={0} showZero>
              <a href="" className="head-example" style={{background:'red'}}>2</a>
              <span className="handle">距离到期还有1天</span>
            </Badge>
            <Badge count={10}>
              <a href="" className="head-example" style={{background:'blue'}}>3</a>
              <span className="handle">距离到期还有5天</span>
            </Badge>
            <Badge count={15}>
              <a href="" className="head-example" style={{background:'yellowgreen'}}>3</a>
              <span className="handle">距离到期还有15天</span>
            </Badge>
            <Badge count={25}>
              <a href="" className="head-example" style={{background:'yellowgreen'}}>3</a>
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
