import React, { Component } from 'react'
import routes from '../../routes'
import {withRouter} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import './AppFrame.less'
const menus=routes.filter(route=>route.isMenu===true)
const { Header, Sider, Content } = Layout;
class AppFrame extends Component {
    state = {
        collapsed: false,
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    handleClick=({ key })=>{
        const {
            history,
            match
        }=this.props
       history.push(`${match.path}${key}`)
    }
  render() {
    return (
        <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[menus[0].path]} onClick={this.handleClick}>
          {
              menus.map(item=>{
                  return (
                  <Menu.Item key={item.path}>
                    <Icon type="user" />
                    <span>{item.title}</span>
                    </Menu.Item>)
              })
          }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default  withRouter(AppFrame)