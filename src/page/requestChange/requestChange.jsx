import React, {Component} from 'react';
import {Button, Table, Icon, Divider} from 'antd';
import {Link} from 'react-router-dom';

import FormRequestChange
  from '../../components/formRequestChange/formRequestChange';

import './requestChange.css';
import http from '../../service/http';

export default class RequestChange extends Component {

  columns = [
    {
      title: 'Código',
      dataIndex: 'rfc_Codigo',
      key: 'rfc_Codigo',
      render: text => `P00${text}`,
    }, {
      title: 'Asunto',
      dataIndex: 'rfc_Asunto',
      key: 'rfc_Asunto',
    }, {
      title: 'Proyecto',
      dataIndex: 'pro_Nombre',
      key: 'pro_Nombre',
    }, {
      title: 'F. Solicitud',
      dataIndex: 'rfc_FechaSolicitud',
      key: 'rfc_FechaSolicitud',
    },
    {
      title: 'Estado',
      dataIndex: 'est_Estado',
      key: 'est_Estado',
    }, {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (text, record) => (
        <span>
          <Link to={`flow/${text.rfc_Codigo}`}>Ir al Flujo</Link>
        </span>
      ),
    }];

  constructor(props) {
    super(props);
    this.openNewRequest = this.openNewRequest.bind(this);
    this.titleTable = this.titleTable.bind(this);
    this.closeNewRequest = this.closeNewRequest.bind(this);
    this.onOk = this.onOk.bind(this);
  }

  state = {
    visible: false,
    loading: true,
    data: [],
  };

  openNewRequest() {
    this.setState({
      visible: true,
    });
  }

  closeNewRequest() {
    this.setState({
      visible: false,
    });
  }

  titleTable() {
    return (
        <div className="title-table">
          <strong> Solicitudes de cambios </strong>
          <Button type="primary" icon="plus"
                  onClick={this.openNewRequest}>Nuevo</Button>
        </div>
    );
  }

  fetchListRFC() {
    http('C0001G0001', 'GET', {}, (data) => {
      this.setState({
        data,
        loading: false,
      });
    });
  }

  componentDidMount() {
    this.fetchListRFC();
  }

  onOk = (response) => {
    this.fetchListRFC();
    this.closeNewRequest();
  };

  render() {
    let {visible, data, loading} = this.state;
    return (
        <div className="request-change page">
          <Table
              columns={this.columns}
              dataSource={data}
              size="middle"
              loading={loading}
              bordered
              scroll={{x: 1300}}
              title={this.titleTable}/>
          <FormRequestChange visible={visible} onOk={this.onOk}
                             onCancel={this.closeNewRequest}/>
        </div>
    );
  }

}
