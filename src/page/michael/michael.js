import React, { Component } from 'react';
import {Button, Table, Icon, Divider} from 'antd'

import FormRequestChange from '../../components/formRequestChange/formRequestChange'

import './michael.css'

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
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

export default class Michael extends Component {

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
          <strong> Solicitudes de cambios </strong>
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
