import React, { Component } from 'react';
import {Layout, Menu, Avatar} from 'antd'
import logo from './../../assert/logo.png'
import { NavLink } from 'react-router-dom'
let {Header} = Layout;

export default class Eheader extends Component {


  render() {
    return (
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
              <Menu.Item key="1">Gestión de Cambio</Menu.Item>
              <Menu.Item key="3">Módulo 3</Menu.Item>
            </Menu>
          </div>
          <div>
            <Avatar style={{background: '#87d068'}} size="large">
              W
            </Avatar>
          </div>
        </Header>
    );
  }

}
