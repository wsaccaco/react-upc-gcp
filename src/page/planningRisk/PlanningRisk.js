import React, {Component} from 'react';
import {Table} from 'antd';

import FormPlanningRisk from '../../components/formPlanningRisk/formPlanningRisk'
import './PlanningRisk.css';
import http from "../../service/http";

class PlanningRisk extends Component {

    columnsRiskPending = [
        {
            title: 'Código',
            dataIndex: 'rfc_Codigo',
            key: 'rfc_Codigo',
            render: text => `P00${text}`,
        }, {
            title: 'Fecha Recepción',
            dataIndex: 'evr_FechaEnvio',
            key: 'evr_FechaEnvio'
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
            title: 'Opción',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (text, record) => (
                <span>
                  <a href="javascript:;" onClick={() => {this.openRequest(text.rfc_Codigo);}}> Evaluar </a>
                </span>
            ),
        }];

    columnsRiskAttended = [
        {
            title: 'Código',
            dataIndex: 'rfc_Codigo',
            key: 'rfc_Codigo',
            render: text => `P00${text}`,
        }, {
            title: 'Fecha de Atención',
            dataIndex: 'evr_FechaRespuesta',
            key: 'evr_FechaRespuesta'
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
            title: 'Opción',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (text, record) => (
                <span>
                  <a href="javascript:;" onClick={() => {this.openRequest(text.rfc_Codigo);}}> Ver </a>
                </span>
            ),
        }];

    constructor(props) {
        super(props);
        this.openRequest = this.openRequest.bind(this);
        this.closeRequest = this.closeRequest.bind(this);
        this.titleTableRiskPending = this.titleTableRiskPending.bind(this);
        this.titleTableRiskAttended = this.titleTableRiskAttended.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    state = {
        rfc_Codigo: 0,
        visible: false,
        loading: true,
        dataRiskPending: [],
        dataRiskAttended: []
    };

    openRequest(rfc_Codigo) {
        this.setState({
            rfc_Codigo,
            visible: true,
        });
    }

    closeRequest() {
        this.setState({
            visible: false,
        });
    }

    titleTableRiskPending() {
        return (
            <div className="title-table">
                <strong> Riesgos Pendientes </strong>
            </div>
        );
    }

    titleTableRiskAttended() {
        return (
            <div className="title-table">
                <strong> Riesgos Atendidos </strong>
            </div>
        );
    }

    fetchListRiskPending() {
        http('GestionarRiesgo/1', 'GET', {}, (dataRiskPending) => {
            this.setState({
                dataRiskPending,
                loading: false,
            });
        });
    }

    fetchListRiskAttended() {
        http('GestionarRiesgo/3', 'GET', {}, (dataRiskAttended) => {
            this.setState({
                dataRiskAttended,
                loading: false,
            });
        });
    }

    componentDidMount() {
        this.fetchListRiskPending();
        this.fetchListRiskAttended();
    }

    onOk = (response) => {
        this.fetchListRiskPending();
        this.fetchListRiskAttended();
        this.closeRequest();
    };

    render() {
        let {rfc_Codigo, visible, dataRiskPending, dataRiskAttended, loading} = this.state;
        return (
            <div className="flow-requirement component">
              <div className="wrap-table">
                  <Table
                      title={this.titleTableRiskPending}
                      columns={this.columnsRiskPending}
                      dataSource={dataRiskPending}
                      size="middle"
                      loading={loading}
                      bordered
                      scroll={{x: 1300}}/>
              </div>

              <div className="wrap-table">
                  <Table
                      title={this.titleTableRiskAttended}
                    columns={this.columnsRiskAttended}
                    dataSource={dataRiskAttended}
                    size="middle"
                    loading={loading}
                    bordered
                    scroll={{x: 1300}}/>
              </div>

                <FormPlanningRisk rfc_Codigo={rfc_Codigo}
                                  visible={visible}
                                  onOk={this.onOk}
                                  onCancel={this.closeRequest}/>
            </div>
        );
    }
}

export default PlanningRisk;
