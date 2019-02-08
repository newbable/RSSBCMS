import React, { Component } from 'react'
import { List, Button } from 'antd';

import store from '../../../store'
import {jia} from '../../../actions/Notice'
window.store=store

export default class Notice extends Component {
  constructor(){
    super()
    this.state={
      data:[
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ],
      count:0
    }
  }
  handlejiaclick=()=>{
    store.dispatch(jia())
  }
  setcount=()=>{
    this.setState({
      count:store.getState().notice.n //手动连接reducer
  })
}
  componentDidMount(){
    this.setcount()
    store.subscribe(this.setcount)
    }
  
  render() {
    return (
      <div>    
        <h3 style={{ marginBottom: 16,fontSize:24}}>重要通知</h3> <Button>全部标记为已读</Button>   
    <List
      dataSource={this.state.data}
      renderItem={item => (
        <List.Item>
          <span style={{ marginTop: 4,fontWeight:700}}>{item}</span>
          <Button style={{ marginLeft: 16}}>标记为已读</Button>
        </List.Item>)}
    />
    <Button>-</Button>{this.state.count}<Button onClick={this.handlejiaclick}>+</Button>
      </div>
    )
  }
}
