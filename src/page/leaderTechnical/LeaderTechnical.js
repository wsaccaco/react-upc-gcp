import React, {Component} from 'react';
import {Col, Row, Card, InputNumber, Table} from 'antd';
import LeaderTechnicalLayout from '../../layout/leaderTechnical/leaderTechnical';

import './LeaderTechnical.css';
import http from '../../service/http';

template = [
  {
    title: 'Codigo',
    dataIndex: 'rfc_Codigo',
    key: 'rfc_Codigo',
  },
  {
    title: 'Proyecto',
    dataIndex: 'pro_Nombre',
    key: 'pro_Nombre'
  }, {
    title: 'RFC',
    dataIndex: 'rfc_Asunto',
    key: 'rfc_Asunto',
  }, {
    title: 'Codigo Req',
    dataIndex: 'lir_Codigo',
    key: 'lir_Codigo',
  }, {
    title: 'Requerimiento',
    dataIndex: 'lir_Nombre',
    key: 'lir_Nombre',
  }, {
    title: 'Estado',
    dataIndex: 'est_Estado',
    key: 'est_Estado',
  }, {
    title: 'Acciones',
    width: 100,
    fixed: 'right',
    render: text => {
      return <a href="#" onClick={this._openModal.bind(this)}>Evaluar</a>;
    },
  }];

export default class LeaderTechnical extends Component {

  constructor(props) {
    super(props);
    let {params: {id}} = props.match;
    this.state = {
      dataSource: [],
      dataSourcePendiente: [],
      items: [],
      text: '',
      FormTechnicalEvalue: '',
      visibleModal: true,
      id
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _openModal() {
    import('../../components/formEvalueTechnical/formEvalueTechnical.js').then(
      Component => {
        this.setState({
          FormTechnicalEvalue: Component.default,
          visibleModal: true,
        });
      });
  }

  _close(){
    this.setState({
      visibleModal:false
    })
  }

  fetchRequerimientoTecnico() {
    let {id} = this.state;
    http(`RequerimientoTecnico/${id}`, 'GET', {}, (response) => {
      this.setState({
        dataSource: response
      });
    });
  }

  fetchRequerimientoTecnicoPendiente() {
    let {id} = this.state;
    http(`RequerimientoTecnicoPendiente/${id}`, 'GET', {}, (response) => {
      this.setState({
        dataSourcePendiente: response
      });
    });
  }

  componentDidMount(){
    this._openModal();
    this.fetchRequerimientoTecnico();
    this.fetchRequerimientoTecnicoPendiente();
  }

  render() {
    let {loading, FormTechnicalEvalue, visibleModal, dataSource, dataSourcePendiente} = this.state;
    return (
      <LeaderTechnicalLayout>
        <Row justify="center" type="flex">
          <Col>
            <div style={{width: '100%', maxWidth: '1200px'}}>
              <Table
                title={() => <strong>Lista de Evaluaciones tecnicas
                  Pendientes</strong>}
                columns={this.columnsRiskPending}
                dataSource={dataSource}
                size="middle"
                loading={loading}
                bordered
                scroll={{x: 1500}}/>
            </div>

          </Col>

          <Col>
            <div style={{width: '100%', maxWidth: '1200px'}}>
              <Table
                style={{marginTop: '25px'}}
                title={() => <strong>Historial de evaluaciones</strong>}
                columns={this.columnsRiskPending}
                dataSource={dataSourcePendiente}
                size="middle"
                loading={loading}
                bordered
                scroll={{x: 1300}}/>
            </div>
          </Col>
        </Row>
        {FormTechnicalEvalue && visibleModal
          ? <FormTechnicalEvalue
            visible={visibleModal}
            onOk={() => {}}
            onCancel={this._close.bind(this)}/>
          : null}
      </LeaderTechnicalLayout>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: '',
    }));
  }
}

