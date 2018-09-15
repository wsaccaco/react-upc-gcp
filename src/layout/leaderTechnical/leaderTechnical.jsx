import React, { Component } from 'react';
import {Layout, Breadcrumb, Menu, Avatar} from 'antd';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import Eheader from '../../components/Eheader/Eheader';
import RequestChange from '../../page/requestChange/requestChange';
import FlowPage from '../../page/flow/Flow';
import LeaderTechnical from '../../page/leaderTechnical/LeaderTechnical'
import logo from '../../assert/logo.png';

const { SubMenu } = Menu;
const { Footer, Sider, Content } = Layout;
let {Header} = Layout;

export default class Change extends Component {

  state = {
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    let {children} = this.props;
    return (
        <Layout className="View leader-technical">
          <Header style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex'}}>
              <NavLink to="/change/main">
                <div className="logo">
                  <img src={logo} style={{maxHeight: '64px', display: 'flex', margin: '0 5px'}} alt=""/>
                </div>
              </NavLink>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">Evaluar Requerimiento</Menu.Item>
              </Menu>
            </div>
            <div>
              <Avatar style={{background: '#87d068'}} size="large">
                J
              </Avatar>
            </div>
          </Header>
          <Layout>
            <Layout style={{ padding: '0 24px 0' }}>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 480 }}>
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
    );
  }

}
