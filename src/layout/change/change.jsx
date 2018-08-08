import React, { Component } from 'react';
import {Layout, Breadcrumb, Menu, Icon} from 'antd'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Eheader from '../../components/Eheader/Eheader';
import RequestChange from '../../page/requestChange/requestChange';
import Michael from '../../page/michael/michael';

const { SubMenu } = Menu;
const { Footer, Sider, Content } = Layout;

export default class Change extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render() {
    let {match} = this.props;
    return (
        <Layout className="View Change">
          <Eheader />
          <Layout>

            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
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
                    <Route exact path={`${match.path}/michael`} component={Michael}/>
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
