import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, message, Popconfirm, Radio, Select, Table, Row, Col} from 'antd';
import moment from 'moment';

import './Risk.css';
import '../FlowRequirement/FlorRequirement.css'

import http from '../../service/http';

let FormItem = Form.Item;
let RadioGroup = Radio.Group;
let Option = Select.Option;
let TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const textEnviarRiesgo = 'Estas seguro de enviar la información a Evaluar en Riesgo?';
//const dateFormat = 'YYYY/MM/DD';
const dateFormat = 'DD/MM/YYYY';

//Cambios de Requerimientos
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
let columns_requirement_change = [..._column_template];

class Risk extends Component {

    constructor(props) {
        super(props);
        this.fetchEstado = this.fetchEstado.bind(this);
        this.fetchImpacto = this.fetchImpacto.bind(this);
    }

    state = {
        evr_Requiere: 0,
        evr_FechaEnvio: '01/01/1900',
        evr_Estado: 'Estado',
        evr_FechaRespuesta: '01/01/1900',
        evr_Informe: '',
        evr_Impacto: 'Impacto',

        evaluacionriesgoDisabled: false,
        enviarriesgoDisabled: true,
        OptionEstado: [],
        estadoDisabled: true,
        fenvioDisabled: true,
        frespuestaDisabled: true,
        informeDisabled: true,
        OptionImpacto: [],
        impactoDisabled: true,
        downloadDisabled: true,

        dataSourceChange: [],
        loadingChange: true,
    };

    onChange = (e) => {
        //console.log('radio checked', e.target.value);
        this.setState({
            valueRadioRisk: e.target.value
        });
        if (e.target.value == 0){
            this.setState({
                enviarriesgoDisabled: true
            });
        } else {
            this.setState({
                enviarriesgoDisabled: false
            });
        }
    }

    confirmEnviarRiesgo(e) {
        e.preventDefault();
        let {form} = this.props;

        //PopConfirm
        http('RFC/EvaluacionRiesgo', 'POST', form, (response) => {
            if (response === 'OK') {
                message.success('Se envio la información a Evaluar en Riesgo.');
                let {evr_Requiere,
                    evr_FechaEnvio,
                    evr_Estado,
                    evr_FechaRespuesta,
                    evr_Informe,
                    evr_Impacto} = response;
                this.setState({
                    evr_Requiere,
                    evr_FechaEnvio,
                    evr_Estado,
                    evr_FechaRespuesta,
                    evr_Informe,
                    evr_Impacto
                });
            } else {
                message.warning('Ocurrio un error en el envio.');
            }
        }, (e) => {
            console.error(e)
        } );
    }

    fetchEstado(){
        http('RFC/EstadoRiesgo', 'GET', {}, (response) => {
            let OptionEstado = response.map(({esr_Descripcion:text, esr_Codigo:value}, index) => {
                return <Option key={index} value={value}>{text}</Option>;
            }, (err) => {
                console.log(err);
            });
            this.setState({
                OptionEstado
            })
        });
    }

    fetchImpacto(){
        http('RFC/ImpactoRiesgo', 'GET', {}, (response) => {
            let OptionImpacto = response.map(({imp_Descripcion:text, imp_Codigo:value}, index) => {
                return <Option key={index} value={value}>{text}</Option>;
            }, (err) => {
                console.log(err);
            });
            this.setState({
                OptionImpacto
            })
        });
    }

    fetchEvaluacionRiesgo(){
        let {rfc_id} = this.props;
        http('RFC/EvaluacionRiesgo/' + rfc_id, 'GET', {}, (response) => {
            let {evr_Requiere,
                evr_FechaEnvio,
                evr_Estado,
                evr_FechaRespuesta,
                evr_Informe,
                evr_Impacto} = response;
            let {evaluacionriesgoDisabled,enviarriesgoDisabled} = this.state;
            if (evr_Requiere == 1){
                evaluacionriesgoDisabled = true;
                enviarriesgoDisabled = true;
            }
            this.setState({
                evaluacionriesgoDisabled,
                enviarriesgoDisabled,

                evr_Requiere,
                evr_FechaEnvio,
                evr_Estado,
                evr_FechaRespuesta,
                evr_Informe,
                evr_Impacto
            });
        }, (e) => {
            console.error(e)
        } );
    }

    //Cambios de Requerimientos
    fetchRequerimentsChanged() {
        const {rfc_id} = this.props;
        this.setState({
            loadingChange: true
        });

        http( 'C0002G0004', 'POST', {rfc_Codigo:rfc_id}, (response) => {
            this.setState({
                dataSourceChange: response,
                loadingChange: false
            })
        }, (e) => {
            console.error(e)
        } );
    }
    titleTable() {
        return (
            <div className="title-table">
                <strong> Cambios de Requerimientos </strong>
            </div>
        );
    }

    componentDidMount() {
        this.fetchEstado();
        this.fetchImpacto();
        this.fetchEvaluacionRiesgo();
        //Cambios de Requerimientos
        this.fetchRequerimentsChanged()
    }

    render() {
        let {visible, onOk, onCancel, form, rfc_id} = this.props;
        let {
            evr_Requiere,
            evr_FechaEnvio,
            evr_Estado,
            evr_FechaRespuesta,
            evr_Informe,
            evr_Impacto,

            evaluacionriesgoDisabled,
            enviarriesgoDisabled,
            OptionEstado,
            estadoDisabled,
            fenvioDisabled,
            frespuestaDisabled,
            informeDisabled,
            OptionImpacto,
            impactoDisabled,
            downloadDisabled,

            dataSourceChange,
            loadingChange
        } = this.state;

        const {getFieldDecorator} = form;

        return (
            <Form className="gcp-form">
                <div>
                    <Row>
                        <Col span={12}>
                            <FormItem>
                                {getFieldDecorator('rfc_Codigo', {
                                    rules: [],
                                    initialValue: rfc_id
                                })(
                                    <Input type="hidden"/>
                                )}
                            </FormItem>

                            <FormItem
                                label={'Requiere evaluación'}
                                {...formItemLayout}
                                >
                                {getFieldDecorator('evr_Requiere', {
                                    rules: [],
                                    initialValue: evr_Requiere
                                })(
                                    <RadioGroup
                                        onChange={this.onChange}
                                        disabled={evaluacionriesgoDisabled}>
                                        <Radio value={0}>NO</Radio>
                                        <Radio value={1}>SI</Radio>
                                    </RadioGroup>
                                )}
                                <Popconfirm placement="bottom" title={textEnviarRiesgo} onConfirm={this.confirmEnviarRiesgo} okText="Yes" cancelText="No">
                                    <Button
                                        type="primary"
                                        icon="rocket"
                                        disabled={enviarriesgoDisabled}>
                                        Enviar a Riesgo
                                    </Button>
                                </Popconfirm>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label={'Fecha de Envio'}
                                {...formItemLayout}
                            >
                                <DatePicker
                                    disabled={fenvioDisabled}
                                    defaultValue={moment(evr_FechaEnvio, this.dateformat)}
                                    format={dateFormat}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label={'Estado'}
                                {...formItemLayout}
                            >
                                <Select
                                    showSearch
                                    disabled={estadoDisabled}
                                    placeholder="Seleccione Estado"
                                    defaultValue={evr_Estado}>
                                    {OptionEstado}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label={'Fecha de Respuesta'}
                                {...formItemLayout}
                            >
                                <DatePicker
                                    disabled={frespuestaDisabled}
                                    defaultValue={moment(evr_FechaRespuesta, this.dateformat)}
                                    format={dateFormat}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label={'Informe'}
                                {...formItemLayout}
                            >
                                <TextArea
                                    disabled={informeDisabled}
                                    placeholder="Resumen de informe emitido por Gestión de Riesgo"
                                    defaultValue={evr_Informe}
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label={'Impacto'}
                                {...formItemLayout}
                                >
                                <Select
                                    showSearch
                                    disabled={impactoDisabled}
                                    placeholder="Seleccione Impacto"
                                    defaultValue={evr_Impacto}>
                                    {OptionImpacto}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label={'Adjunto'}
                                {...formItemLayout}
                                >
                                <Button
                                    icon="download"
                                    //onClick={}
                                    disabled={downloadDisabled}>
                                    Download
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                    {/*Cambios de Requerimientos*/}
                    <FormItem>
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
                        </div>
                    </FormItem>
                </div>
            </Form>
        );
    }
}

export default  Form.create()(Risk);