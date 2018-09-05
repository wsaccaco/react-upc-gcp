import React, {Component} from 'react';
import {Button, Card, Col, DatePicker, Form, Input, message, Modal, Radio, Row, Select, Table, Divider} from 'antd';
import moment from 'moment';

import './Risk.css';
import '../FlowRequirement/FlorRequirement.css'
import {getPrioridad} from '../../tools/tools'

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
let columns_requirement_change = [..._column_template];

class Risk extends Component {

    constructor(props) {
        super(props);
        this.fetchPrioridad = this.fetchPrioridad.bind(this);
    }

    state = {
        evr_Requiere: 0,
        pri_Codigo: null,
        evr_Observacion: '',
        evr_FechaEnvio: '',
        esr_Descripcion: '',
        evr_FechaRespuesta: '',
        evr_Informe: '',
        imp_Descripcion: '',
        evr_LineaBase: '',
        evr_Presupuesto: '',

        evaluacionriesgoDisabled: false,
        enviarriesgoDisabled: true,
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
                                        pri_Codigo} = response;
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
                                        pri_Codigo
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

    fetchEvaluacionRiesgo(){
        let {rfc_id} = this.props;
        http('EvaluacionRiesgo/' + rfc_id, 'GET', {}, (response) => {
            let {evr_Requiere,
                pri_Codigo,
                evr_Observacion,
                evr_FechaEnvio,
                esr_Descripcion,
                evr_FechaRespuesta,
                evr_Informe,
                imp_Descripcion,
                evr_LineaBase,
                evr_Presupuesto} = response[0];
            console.log(evr_Requiere,pri_Codigo,evr_Observacion,evr_FechaEnvio,esr_Descripcion,evr_FechaRespuesta,evr_Informe,imp_Descripcion,evr_LineaBase,evr_Presupuesto);
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
            if (evr_LineaBase === true){
                evr_LineaBase = 'Linea Base';
            }
            if (evr_Presupuesto === true){
                evr_Presupuesto = 'Presupuesto';
            }
            this.setState({
                evaluacionriesgoDisabled,
                enviarriesgoDisabled,
                prioridadDisabled,
                observacionDisabled,
                evr_Requiere,
                pri_Codigo,
                evr_Observacion,
                evr_FechaEnvio,
                esr_Descripcion,
                evr_FechaRespuesta,
                evr_Informe,
                imp_Descripcion,
                evr_LineaBase,
                evr_Presupuesto});
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
        this.fetchEvaluacionRiesgo();
        //Cambios de Requerimientos
        this.fetchRequerimentsChanged()
    }

    render() {
        let {form, rfc_id} = this.props;
        let {
            evr_Requiere,
            pri_Codigo,
            evr_Observacion,
            evr_FechaEnvio,
            esr_Descripcion,
            evr_FechaRespuesta,
            evr_Informe,
            imp_Descripcion,
            evr_LineaBase,
            evr_Presupuesto,

            evaluacionriesgoDisabled,
            enviarriesgoDisabled,
            OptionPrioridad,
            prioridadDisabled,
            observacionDisabled,

            dataSourceChange,
            loadingChange
        } = this.state;

        const {getFieldDecorator} = form;

        return (
            <Form onSubmit={this.handleSubmit} className="gcp-form" >
                <Row gutter={16}>
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
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem
                            label={'Observación'}
                            {...formItemLayout}>
                            {getFieldDecorator('evr_Observacion', {
                                rules: [{required: true, message: 'Ingrese una observación'}],
                                initialValue: evr_Observacion
                            })(
                                <TextArea
                                    disabled={observacionDisabled}
                                    placeholder="Ingrese una observación"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label={'Prioridad'}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('pri_Codigo', {
                                rules: [{required: true, message: 'Seleccione Prioridad'}],
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
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card title="Evaluación">
                            <Row>
                                <Col span={12}>
                                    <p>Fecha de Envio : </p>{evr_FechaEnvio}
                                </Col>
                                <Col span={12}>
                                    <p>Estado : </p>{esr_Descripcion}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <p>Fecha de Repuesta : </p>{evr_FechaRespuesta}
                                </Col>
                                <Col span={12}>
                                    <p>Informe : </p>{evr_Informe}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <p>Impacto : </p>{imp_Descripcion}
                                </Col>
                                <Col span={12}>
                                    <p>Afectación : </p>{evr_LineaBase}<Divider type="vertical"/>{evr_Presupuesto}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                {/*Cambios de Requerimientos*/}
                <Row gutter={16}>
                    <Col span={24}>
                        <Card title="Cambios de Requerimientos">
                            <Table
                                bordered
                                locale={{emptyText: 'No hay datos'}}
                                size="small"
                                scroll={{x: 800}}
                                loading={loadingChange}
                                dataSource={dataSourceChange}
                                columns={columns_requirement_change} />
                        </Card>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default  Form.create()(Risk);