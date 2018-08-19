import React, { Component } from 'react';
import {Layout, Menu} from 'antd'

let {Header} = Layout;

export default class Eheader extends Component {


  render() {
    return (
        <Header>
          <div className="logo" />
          <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Módulo 1</Menu.Item>
            <Menu.Item key="2">Módulo 2</Menu.Item>
            <Menu.Item key="3">Módulo 3</Menu.Item>
          </Menu>
        </Header>
    );
  }

}