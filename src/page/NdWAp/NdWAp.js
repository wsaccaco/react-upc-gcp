import React, { Component } from 'react';
import {Button, Table, Icon, Divider} from 'antd'

import FormRequestChange from '../../components/formRequestChange/formRequestChange'

import './NdWAp.css'

const columns = [{
  title: 'Código',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
      <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'Negro Cebolla',
  age: 32,
  address: 'Chincha',
}, {
  key: '2',
  name: 'Negro de whatsapp',
  age: 42,
  address: 'Africa',
}, {
  key: '3',
  name: 'Negro Tres Leches',
  age: 32,
  address: 'El ayudante de su capi',
}];

export default class NdWAp extends Component {

  constructor(props) {
    super(props);
    this.openNewRequest = this.openNewRequest.bind(this);
    this.titleTable = this.titleTable.bind(this);
    this.closeNewRequest = this.closeNewRequest.bind(this);
  }

  state = {
    visible: false
  };

  openNewRequest(){
    this.setState({
      visible : true
    });
  }

  closeNewRequest(){
    this.setState({
      visible : false
    });
  }

  titleTable(){
    return (
        <div className="title-table">
          <strong> Lista de negros que le encantan a Juan Montes </strong>
          <Button type="primary" icon="plus" onClick={() => this.openNewRequest()}>Nuevo</Button>
        </div>
    )
  }

  render() {
    let {visible} = this.state;
    return (
        <div className="request-change page">
          <Table
              columns={columns}
              dataSource={data}
              size="middle"
              bordered
              title={this.titleTable}/>
          <FormRequestChange visible={visible} onOk={()=>{}} onCancel={this.closeNewRequest} />
        </div>
    );
  }

}
