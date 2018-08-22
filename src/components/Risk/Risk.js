import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, message, Popconfirm, Radio, Select, Table, Row, Col, Modal} from 'antd';
import moment from 'moment';

import './Risk.css';
import '../FlowRequirement/FlorRequirement.css'

import http from '../../service/http';

let FormItem = Form.Item;
let RadioGroup = Radio.Group;
let Option = Select.Option;
let TextArea = Input.TextArea;

const confirm = Modal.confirm;
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
const dateFormat = 'YYYY-MM-DD';
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
        this.fetchPrioridad = this.fetchPrioridad.bind(this);
        this.fetchEstado = this.fetchEstado.bind(this);
        this.fetchImpacto = this.fetchImpacto.bind(this);
    }

    state = {
        evr_Requiere: 0,
        evr_FechaEnvio: '1900-01-01',
        evr_Estado: 'Estado',
        evr_FechaRespuesta: '1900-01-01',
        evr_Informe: '',
        evr_Impacto: 'Impacto',

        pri_Codigo: 'Prioridad',
        evr_Observacion: '',

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

        prioridadDisabled: true,
        OptionPrioridad: [],
        observacionDisabled: true,

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
                enviarriesgoDisabled: true,
                prioridadDisabled: true,
                observacionDisabled: true
            });
        } else {
            this.setState({
                enviarriesgoDisabled: false,
                prioridadDisabled: false,
                observacionDisabled: false
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {form} = this.props;
        form.validateFields((err, form) => {
            if (!err) {
                console.log('Received values of form: ', form);

                confirm({
                    title: 'Seguro de enviar la información a Gestión de Riesgo?',
                    content: 'Se enviará toda la información del RFC al proceso de evaluación de riesgo.',
                    onOk: () => {
                        console.log('OK');
                        try{
                            http('EvaluacionRiesgo', 'POST', form, (response) => {
                                let {evr_Codigo} = response;
                                if (evr_Codigo > 0) {
                                    message.success('Se envio la información a Gestión de Riesgo.');
                                    let {evr_Requiere,
                                        evr_FechaEnvio,
                                        evr_Estado,
                                        evr_FechaRespuesta,
                                        evr_Informe,
                                        evr_Impacto,
                                        pri_Codigo,
                                        evr_Observacion} = response;
                                    let {evaluacionriesgoDisabled,
                                        enviarriesgoDisabled,
                                        prioridadDisabled,
                                        observacionDisabled} = this.state;
                                    if (evr_Requiere === true){
                                        evr_Requiere = 1;
                                        evaluacionriesgoDisabled = true;
                                        enviarriesgoDisabled = true;
                                        prioridadDisabled = true;
                                        observacionDisabled = true;
                                    }
                                    console.log(this);
                                    this.setState({
                                        evaluacionriesgoDisabled,
                                        enviarriesgoDisabled,
                                        prioridadDisabled,
                                        observacionDisabled,
                                        evr_Requiere,
                                        evr_FechaEnvio,
                                        evr_Estado,
                                        evr_FechaRespuesta,
                                        evr_Informe,
                                        evr_Impacto,
                                        pri_Codigo,
                                        evr_Observacion
                                    });
                                } else {
                                    message.warning('Ocurrió un error en el envió.');
                                }
                            }, (e) => {
                                console.error(e)
                            } );
                        } catch (e) {
                            console.error(e)
                        }
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
            }
        });
    }

    fetchPrioridad(){
        http('PrioridadRiesgo', 'GET', {}, (response) => {
            let OptionPrioridad = response.map(({pri_Descripcion:text, pri_Codigo:value}, index) => {
                return <Option key={index} value={value}>{text}</Option>;
            }, (err) => {
                console.log(err);
            });
            this.setState({
                OptionPrioridad
            })
        });
    }

    fetchEstado(){
        http('EstadoRiesgo', 'GET', {}, (response) => {
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
        http('ImpactoRiesgo', 'GET', {}, (response) => {
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
        http('EvaluacionRiesgo/' + rfc_id, 'GET', {}, (response) => {
            let {evr_Requiere,
                evr_FechaEnvio,
                evr_Estado,
                evr_FechaRespuesta,
                evr_Informe,
                evr_Impacto,
                pri_Codigo,
                evr_Observacion} = response[0];
            console.log(evr_Requiere,
                evr_FechaEnvio,
                evr_Estado,
                evr_FechaRespuesta,
                evr_Informe,
                evr_Impacto,
                pri_Codigo,
                evr_Observacion);
            let {evaluacionriesgoDisabled,
                enviarriesgoDisabled,
                prioridadDisabled,
                observacionDisabled} = this.state;
            if (evr_Requiere === true){
                evr_Requiere = 1;
                evaluacionriesgoDisabled = true;
                enviarriesgoDisabled = true;
                prioridadDisabled = true;
                observacionDisabled = true;
            }
            this.setState({
                evaluacionriesgoDisabled,
                enviarriesgoDisabled,
                prioridadDisabled,
                observacionDisabled,
                evr_Requiere,
                evr_FechaEnvio,
                evr_Estado,
                evr_FechaRespuesta,
                evr_Informe,
                evr_Impacto,
                pri_Codigo,
                evr_Observacion
            });
        }, (e) => {
            console.error(e)
        });
    }

    //Cambios de Requerimientos
    fetchRequerimentsChanged() {
        const {rfc_id} = this.props;
        this.setState({
            loadingChange: true
        });

        http('/rfc/' + rfc_id + '/nuevosRequerimientos', 'GET', {}, (response) => {
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
        this.fetchPrioridad();
        this.fetchEstado();
        this.fetchImpacto();
        this.fetchEvaluacionRiesgo();
        //Cambios de Requerimientos
        this.fetchRequerimentsChanged()
    }

    render() {
        let {form, rfc_id} = this.props;
        let {
            evr_Requiere,
            evr_FechaEnvio,
            evr_Estado,
            evr_FechaRespuesta,
            evr_Informe,
            evr_Impacto,

            pri_Codigo,
            evr_Observacion,

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

            OptionPrioridad,
            prioridadDisabled,
            observacionDisabled,

            dataSourceChange,
            loadingChange
        } = this.state;

        const {getFieldDecorator} = form;

        return (
            <Form onSubmit={this.handleSubmit} className="gcp-form" >
                <div>
                    <Row>
                        <Col span={12}>
                            <FormItem>
                                {getFieldDecorator('rfc_Codigo', {
                                    rules: [{required: true, message: 'Definir el RFC'}],
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
                                    rules: [{required: false, message: 'Definir Requiere'}],
                                    initialValue: evr_Requiere
                                })(
                                    <RadioGroup
                                        onChange={this.onChange}
                                        disabled={evaluacionriesgoDisabled}>
                                        <Radio value={0}>NO</Radio>
                                        <Radio value={1}>SI</Radio>
                                    </RadioGroup>
                                )}
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon="rocket"
                                    disabled={enviarriesgoDisabled}>
                                    Enviar a Riesgo
                                </Button>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label={'Fecha de Envio'}
                                {...formItemLayout}
                            >
                                <DatePicker
                                    disabled={fenvioDisabled}
                                    value={moment(evr_FechaEnvio, this.dateformat)}
                                    format={dateFormat}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label={'Prioridad'}
                                {...formItemLayout}
                                >
                                {getFieldDecorator('pri_Codigo', {
                                    rules: [{required: true, message: 'Seleccionar Prioridad'}],
                                    initialValue: pri_Codigo
                                })(
                                    <Select
                                        showSearch
                                        disabled={prioridadDisabled}
                                        placeholder="Seleccione Prioridad">
                                        {OptionPrioridad}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label={'Estado'}
                                {...formItemLayout}
                                >
                                <Select
                                    showSearch
                                    disabled={estadoDisabled}
                                    placeholder="Seleccione Estado"
                                    value={evr_Estado}>
                                    {OptionEstado}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label={'Observación'}
                                {...formItemLayout}
                                >
                                {getFieldDecorator('evr_Observacion', {
                                    rules: [{required: true, message: 'Ingrese una observación'}],
                                    initialValue: evr_Observacion
                                })(
                                    <TextArea
                                        disabled={observacionDisabled}
                                        placeholder="Observación"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label={'Fecha de Respuesta'}
                                {...formItemLayout}
                                >
                                <DatePicker
                                    disabled={frespuestaDisabled}
                                    value={moment(evr_FechaRespuesta, this.dateformat)}
                                    format={dateFormat}
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
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
                                    value={evr_Informe}
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
                                    value={evr_Impacto}>
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