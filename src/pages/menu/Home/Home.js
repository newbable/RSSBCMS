import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import {List} from 'antd'

import {homePlay} from '../../../requests'
import './Home.less'

@withRouter
export default class Home extends Component {
  constructor(){
    super()
    this.state={
      img:'',
      news:''
    }
  }
  componentDidMount(){
    homePlay()
      .then(resp=>{
        if(resp.data.code===200){
          this.setState({
            img:resp.data.imgs,
            news:resp.data.news
          })
        }
      })
    var mySwiper = new Swiper ('.swiper-container', {
      loop: true, // 循环模式选项
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
        },//自动轮播
      
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  
    })
  }
  handleListClick=()=>{
    const {history}=this.props
    history.push("/admin/newsdetail")
  }
  render() {
    return (
      <div>
        首页
        <div className="swiper-container">
        <div className="swiper-wrapper">
            <div className="swiper-slide"><img src={this.state.img[0]} alt=''/></div>
            <div className="swiper-slide"><img src={this.state.img[1]} alt=''/></div>
            <div className="swiper-slide"><img src={this.state.img[2]} alt=''/></div>
            <div className="swiper-slide"><img src={this.state.img[3]} alt=''/></div>
            <div className="swiper-slide"><img src={this.state.img[4]} alt=''/></div>
        </div>
        {/* <!-- 如果需要分页器 --> */}
        <div className="swiper-pagination"></div>
        
        {/* <!-- 如果需要导航按钮 --> */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        
       </div>
       <div className="newsList">
       <h3 style={{ margin: '16px 0' }}>新闻列表</h3>
    <List
      size="large"
      header={<h3>今日要闻</h3>}
      bordered
      dataSource={this.state.news}
      renderItem={item => (<List.Item onClick={this.handleListClick}>{item}</List.Item>)}
    />
       </div>
      </div>
    )
  }
}
