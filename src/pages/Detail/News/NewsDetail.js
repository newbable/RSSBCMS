import React, { Component } from 'react'
import {newsDetail} from '../../../requests'

export default class NewsDetail extends Component {
  constructor(){
    super()
    this.state={
      news:''
    }
  }
  componentDidMount(){
    newsDetail()
      .then(resp=>{
        if(resp.data.code===200){
          this.setState({
            news:resp.data.news
          })
        }
      })
  }
  render() {
    return (
      <div>
        <h3>新闻详情</h3>
        <p style={{textIndent:'2em'}}>{this.state.news}</p>
      </div>
    )
  }
}
