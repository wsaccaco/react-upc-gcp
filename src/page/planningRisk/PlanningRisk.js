import React, {Component} from 'react';
import {Table} from 'antd';

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
            render: (text, record) => {
                let {esr_Codigo, rfc_Codigo} = text;
                return (
                  <span>
                  <a href="javascript:;" onClick={() => {this._updateRiskPlaning(rfc_Codigo, esr_Codigo);}}> Evaluar </a>
                </span>
                )
            },
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
            render: (text, record) => {
              let {esr_Codigo, rfc_Codigo} = text;
              return (
                <span>
                      <a href="javascript:;" onClick={() => {this._updateRiskPlaning(rfc_Codigo, esr_Codigo);}}> Ver </a>
                    </span>
              )
            },
        }];

    constructor(props) {
        super(props);
        this._updateRiskPlaning = this._updateRiskPlaning.bind(this);
        this.closeRequest = this.closeRequest.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    state = {
        rfc_Codigo: null,
        esr_Codigo: null,
        visibleModal: false,
        loading: true,
        dataRiskPending: [],
        dataRiskAttended: [],
        FormPlanningRisk: null
    };

    _updateRiskPlaning(rfc_Codigo, esr_Codigo){
        import('../../components/formPlanningRisk/formPlanningRisk').then(FormPlanningRisk => {
            this.setState({
                FormPlanningRisk: FormPlanningRisk.default,
                visibleModal: true,
                rfc_Codigo,
                esr_Codigo
            });
        });
    }

    closeRequest() {
        this.setState({
            visibleModal: false,
        });
    }

    onOk = () => {
        this.fetchListRiskPending();
        this.fetchListRiskAttended();
        this.closeRequest();
    };

    title() {
        return (
            <div className="title-table">
                <strong> GESTION DE RIESGO </strong>
            </div>
        );
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

    render() {
        let {rfc_Codigo, esr_Codigo, visibleModal, dataRiskPending, dataRiskAttended, loading, FormPlanningRisk} = this.state;
        return (
            <div className="flow-requirement component">
                <this.title />
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

                {FormPlanningRisk && visibleModal
                    ? <FormPlanningRisk
                        rfc_Codigo={rfc_Codigo}
                        esr_Codigo={esr_Codigo}
                        visible={visibleModal}
                        onOk={this.onOk}
                        onCancel={this.closeRequest}/>
                    : null }
            </div>
        );
    }
}

export default PlanningRisk;
