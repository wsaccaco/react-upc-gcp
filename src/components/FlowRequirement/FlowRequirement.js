import React, {Component} from 'react';
import {Button, Col, Row, Steps, Card, Table} from 'antd';
import {Link} from 'react-router-dom';
import FormRequirementChange from '../formRequirementChange/formRequirementChange'
import './FlorRequirement.css'

import http from '../../service/http';


const _column_template = [{
  title: 'Código',
  dataIndex: 'lir_Codigo',
  key: 'lir_Codigo',
}, {
  title: 'Requerimiento',
  dataIndex: 'lir_Nombre',
  key: 'lir_Nombre',
}, {
  title: 'Prioridad',
  dataIndex: 'lir_Prioridad',
  key: 'lir_Prioridad',
}, {
  title: 'Estado',
  dataIndex: 'est_Estado',
  key: 'est_Estado',
}, {
  title: 'Fecha',
  dataIndex: 'lir_Fecha',
  key: 'lir_Fecha',
}];

let columns_current_requirement = [..._column_template, ...[{
  title: 'Action',
  key: 'action',
  fixed: 'right',
  width: 100,
  render: (text, record) => (
    <span>
      <a href="javascript:;" onClick={() => {this.openChangeRequirement();}}> Corregir </a>
    </span>
  ),
}]];

let columns_requirement_change = [..._column_template];



export default class FlowRequirement extends Component {

  state = {
    dataSource : [],
    dataSourceChange: [],
    loadingChange: true,
    visibleModal: false
  };

  static getDerivedStateFromProps(nextProps, prevState){
    let { requirements } = nextProps;
    return {
      dataSource : requirements
    }
  }

  fetchRequerimentsChanged() {
    const {rfc_id} = this.props;
    this.setState({
      loadingChange: true,
    });

    http( 'C0002G0004', 'POST', { rfc_Codigo: rfc_id }, ( response ) => {
      this.setState({
        dataSourceChange: response,
        loadingChange: false
      })
    }, (e) => {
      console.error(e)
    } );
  }

  componentDidMount(){
    this.fetchRequerimentsChanged()
  }

  openChangeRequirement(){
    this.setState({
      visibleModal: true
    })
  }

  onCancel(){
    this.setState({
      visibleModal: false
    })
  }

  titleTable() {
    return (
      <div className="title-table">
        <strong> Cambios de Requerimientos </strong>
        <Button type="primary" icon="plus"
                onClick={this.openChangeRequirement.bind(this)}>Nuevo</Button>
      </div>
    );
  }

  render() {
    let {dataSource, loadingChange, dataSourceChange, visibleModal} = this.state;
    return (

        <div className="flow-requirement component">

          <div className="wrap-table">
            <Table
              title={this.titleTable.bind(this)}
              bordered
              locale={{emptyText: 'No hay datos'}}
              size="small"
              scroll={{x: 800}}
              loading={loadingChange}
              dataSource={dataSourceChange}
              columns={columns_requirement_change} />
          </div>

          <div className="wrap-table">
            <Table
              title={() => "Requerimientos actuales del Proyecto"}
              bordered
              locale={{emptyText: 'No hay datos'}}
              size="small"
              scroll={{x: 1000}}
              dataSource={dataSource}
              columns={columns_current_requirement} />
          </div>
          <FormRequirementChange visible={visibleModal} onOk={() => {}}
                             onCancel={this.onCancel.bind(this)}/>
        </div>
    );
  }

}
