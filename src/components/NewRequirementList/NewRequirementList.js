import React, {Component} from 'react';
import {Button, Col, Row, Steps, Card, Table} from 'antd';
import {Link} from 'react-router-dom';
import {getPrioridad} from '../../tools/tools'
import FormRequirementChange from '../formRequirementChange/formRequirementChange'
import './NewRequirementList.css'

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
  render: (_text, record) => {
    let {text} = getPrioridad(_text)
    return text
  }
}, {
  title: 'Estado',
  dataIndex: 'est_Estado',
  key: 'est_Estado',
}, {
  title: 'Fecha',
  dataIndex: 'lir_Fecha',
  key: 'lir_Fecha',
}];

let columns_current_requirement = [..._column_template];

let columns_requirement_change = [..._column_template, ...[{
  title: 'Action',
  key: 'action',
  fixed: 'right',
  width: 100,
  render: (text, record) => (
    <span>
      <a href="javascript:;" onClick={() => {}}> Editar </a>
    </span>
  ),
}]];



export default class NewRequirementList extends Component {

  state = {
    dataSource : [],
    dataSourceChange: [],
    loadingChange: true,
    visibleModal: false,
    rfc_id: this.props.rfc_id
  };

  static getDerivedStateFromProps(nextProps, prevState){
    let { requirements } = nextProps;
    return {
      dataSource : requirements
    }
  }

  fetchRequerimentsChanged() {
    const {rfc_id} = this.state;
    this.setState({
      loadingChange: true,
    });

    http( `rfc/${rfc_id}/nuevosRequerimientos`, 'GET', {}, ( response ) => {
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

  _onOk(data){
    this.fetchRequerimentsChanged();
    this.setState({
      visibleModal: false,
    })
  }

  render() {
    let {dataSource, loadingChange, dataSourceChange, visibleModal, rfc_id} = this.state;
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
          <FormRequirementChange rfc_Codigo={rfc_id} visible={visibleModal} onOk={this._onOk.bind(this)}
                             onCancel={this.onCancel.bind(this)}/>
        </div>
    );
  }

}
