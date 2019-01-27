import React, { Component } from 'react'
import routes from '../../routes'
import {withRouter} from 'react-router-dom'
import { Layout, Menu, Icon} from 'antd';

import './AppFrame.less'
import logo from '../../assets/logo.png'
const menus=routes.filter(route=>route.isMenu===true)
const listMenus=routes.filter(route=>route.listMenu===true)
const userCenter=routes.filter(route=>route.userCenter===true)
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class AppFrame extends Component {
  handleMenuClick=({ key })=>{
    const {
        history,
        match
    }=this.props
   history.push(`${match.path}${key}`)
}
  render() {
    return (
      <Layout>
      <Header className="header">
        <div className="logo" style={{display:'flex',alignItems:'center'}}>
          <img src={logo} alt="RSSB管理系统" style={{height:'64px',lineHeight:'64px'}}/>
          <span style={{color:'aliceblue',fontSize:'24px',lineHeight:'70px',marginLeft:'20px'}}>RSSB管理系统</span>
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[menus[0].path]}
            onClick={this.handleMenuClick}
            style={{ height: '100%', borderRight: 0 }}
            id="sider"
          >
            {
                menus.map(item=>{
                    return (
                    <Menu.Item key={item.path}>
                    <Icon type={item.icon}/>
                      <span>{item.title}</span>
                      </Menu.Item>)
                })
              }
            <SubMenu key="sub1" title={<span><Icon type="bars" />案件列表</span>}>
              {
                listMenus.map(item=>{
                    return (
                    <Menu.Item key={item.path}>
                      <span>{item.title}</span>
                      </Menu.Item>)
                })
              }
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="user" />个人中心</span>}>
            {
                userCenter.map(item=>{
                    return (
                    <Menu.Item key={item.path}>
                      <span>{item.title}</span>
                      </Menu.Item>)
                })
              }
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{
            background: '#fff', padding: 24, margin: 0, minHeight: 280,
          }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
    )
  }
}
export default  withRouter(AppFrame)