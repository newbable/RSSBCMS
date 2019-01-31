import React, { Component } from 'react'
import { Card } from 'antd'
import echarts from 'echarts'
import './Statistic.less'
import { tongjiParag } from '../../../requests'

export default class Statistic extends Component {
  componentWillMount(){

  }
  componentDidMount(){
    //图表的数据
    var myChart = echarts.init(document.getElementById('tablemain'));//实例化echarts
    myChart.setOption({
      title: {},    
      legend: {},
      tooltip: {},
      dataset: {
          source: [
              ['product', '一季度', '二季度', '三季度'],
              ['一组', 43.3, 65.8, 83.7],
              ['二组', 83.1, 73.4, 55.1],
              ['三组', 86.4, 65.2, 82.5],
              ['四组', 72.4, 53.9, 49.1]
          ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
  });
  this.gettongjiParag()//调用获取统计分析段落
  }

  constructor(){
    super()
    this.state={
      data:[]
    }
  }
  //生成分析段落
  gettongjiParag =()=>{
    tongjiParag()
    .then(res=>{
        if(res.data.code === 200){
          this.setState({
            data:res.data.data.paragraph         
          })
         console.log(res.data)
        }
    })
  }

  componentWillUpdate(){

  }
  componentDidUpdate(){
  
  }
  componentWillUnmount(){

  }
  render() {

    return (
      <div>
        <Card title="前三季度各小组人均案件办理量统计与分析"
        bordered={false}
        >      
        <div id="tablemain" style={{ width: 600, height:500, textAlign:"center" }}></div>  
        <h2>案件情况分析：</h2>     
        <div id="fenxi">{this.state.data}</div>
        </Card>
    
      </div>
    )
  }
}
