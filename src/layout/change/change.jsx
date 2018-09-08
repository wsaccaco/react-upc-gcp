import React, { Component } from 'react';
import {Layout, Breadcrumb, Menu, Icon} from 'antd'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Eheader from '../../components/Eheader/Eheader';
import RequestChange from '../../page/requestChange/requestChange';
import FlowPage from '../../page/flow/Flow';

const { SubMenu } = Menu;
const { Footer, Sider, Content } = Layout;

export default class Change extends Component {

  state = {
    collapsed: true,
  };


  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    let {match} = this.props;
    return (
        <Layout className="View Change">
          <Eheader />
          <Layout>

            <Sider width={200}
                   collapsible
                   collapsed={this.state.collapsed}
                   onCollapse={this.onCollapse}
                   style={{ background: '#fff' }}>
              <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="1">
                  <Icon type="solution" theme="outlined" />
                  <span>RFC's</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="pie-chart" />
                  <span>Reportes</span>
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout style={{ padding: '0 24px 0' }}>

              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>

              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 480 }}>
                <Router>
                  <Switch>
                    <Route exact path={`${match.path}/main`} component={RequestChange}/>
                    <Route exact path={`${match.path}/flow/:id`} component={FlowPage}/>
                  </Switch>
                </Router>
              </Content>
            </Layout>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
    );
  }

}
