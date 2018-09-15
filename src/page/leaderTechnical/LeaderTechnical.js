import React, {Component} from 'react';
import {Col, Row, Card, InputNumber, Table} from 'antd';
import LeaderTechnicalLayout from '../../layout/leaderTechnical/leaderTechnical';

import './LeaderTechnical.css';

export default class LeaderTechnical extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      FormTechnicalEvalue: '',
      visibleModal: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  columnsRiskPending = [
    {
      title: 'Código',
      dataIndex: 'rfc_Codigo',
      key: 'rfc_Codigo',
      render: text => `P00${text}`,
    }, {
      title: 'Fecha Recepción',
      dataIndex: 'evr_FechaEnvio',
      key: 'evr_FechaEnvio',
    }, {
      title: 'Fecha Límite',
      dataIndex: 'evr_FechaLimite',
      key: 'evr_FechaLimite',
    }, {
      title: 'Asunto',
      dataIndex: 'rfc_Asunto',
      key: 'rfc_Asunto',
    }, {
      title: 'Prioridad',
      dataIndex: 'pri_Descripcion',
      key: 'pri_Descripcion',
    }, {
      title: 'Estado',
      dataIndex: 'esr_Descripcion',
      key: 'esr_Descripcion',
    }, {
      title: 'Acciones',
      render: text => {
        return <a href="#" onClick={this._openModal.bind(this)}>Evaluar</a>;
      },
    }];

  fakeData = [
    {
      pri_Descripcion: 'Asunto',
    },
  ];

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

  componentDidMount(){
    this._openModal();
  }

  render() {
    let {loading, FormTechnicalEvalue, visibleModal} = this.state;
    return (
      <LeaderTechnicalLayout>
        <Row justify="center" type="flex">
          <Col>
            <Table
              title={() => <strong>Lista de Evaluaciones tecnicas
                Pendientes</strong>}
              columns={this.columnsRiskPending}
              dataSource={this.fakeData}
              size="middle"
              loading={loading}
              bordered
              scroll={{x: 1300}}/>
          </Col>

          <Col>
            <Table
              style={{marginTop: '25px'}}
              title={() => <strong>Historial de evaluaciones</strong>}
              columns={this.columnsRiskPending}
              dataSource={[]}
              size="middle"
              loading={loading}
              bordered
              scroll={{x: 1300}}/>
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

