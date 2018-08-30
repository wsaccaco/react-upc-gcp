import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, message, Popconfirm, Radio, Select, Table, Row, Col, Modal} from 'antd';
import moment from 'moment';

import './Planning.css';
import '../NewRequirementList/NewRequirementList.css'

import http from '../../service/http';

let FormItem = Form.Item;
let RadioGroup = Radio.Group;
let Option = Select.Option;
let TextArea = Input.TextArea;

const confirm = Modal.confirm;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    }
};
const dateFormat = 'YYYY-MM-DD';

const _column_template_requirement = [{
    title: 'Requerimiento',
    dataIndex: 'lir_Codigo',
    key: 'lir_Codigo',
}, {
    title: 'Clasificación',
    dataIndex: 'lir_Nombre',
    key: 'lir_Nombre',
}, {
    title: 'Esfuerzo',
    dataIndex: 'lir_Prioridad',
    key: 'lir_Prioridad',
}, {
    title: 'Inicio',
    dataIndex: 'est_Estado',
    key: 'est_Estado',
}, {
    title: 'Termino',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}, {
    title: 'Responsable',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}, {
    title: 'Acción',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}];
let columns_requirement = [..._column_template_requirement];
const _column_template_rrhh = [{
    title: 'Identificador',
    dataIndex: 'lir_Codigo',
    key: 'lir_Codigo',
}, {
    title: 'Perfil',
    dataIndex: 'lir_Nombre',
    key: 'lir_Nombre',
}, {
    title: 'Cantidad',
    dataIndex: 'lir_Prioridad',
    key: 'lir_Prioridad',
}, {
    title: 'Nivel',
    dataIndex: 'est_Estado',
    key: 'est_Estado',
}, {
    title: 'Desde',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}, {
    title: 'Hasta',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}, {
    title: 'Presupuesto',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}, {
    title: 'Acción',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}];
let columns_rrhh = [..._column_template_rrhh];
const _column_template_add = [{
    title: 'Recurso',
    dataIndex: 'lir_Codigo',
    key: 'lir_Codigo',
}, {
    title: 'Cantidad',
    dataIndex: 'lir_Nombre',
    key: 'lir_Nombre',
}, {
    title: 'Desde',
    dataIndex: 'lir_Prioridad',
    key: 'lir_Prioridad',
}, {
    title: 'Hasta',
    dataIndex: 'est_Estado',
    key: 'est_Estado',
}, {
    title: 'Presupuesto',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}, {
    title: 'Acción',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}];
let columns_requirement_add = [..._column_template_add];
const _column_agreement = [{
    title: 'Fecha',
    dataIndex: 'lir_Codigo',
    key: 'lir_Codigo',
}, {
    title: 'Resumen',
    dataIndex: 'lir_Nombre',
    key: 'lir_Nombre',
}, {
    title: 'Acción',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}];
let columns_agreement = [..._column_agreement];
class Planning extends Component {

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
            valueRadioPlanning: e.target.value
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
                        <Col>
                            {getFieldDecorator('rfc_Codigo', {
                                rules: [{required: true, message: 'Definir el RFC'}],
                                initialValue: rfc_id
                            })(
                                <Input type="hidden"/>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem label={'Codigo de informe:'} {...formItemLayout}>
                                <Input disabled={true} />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={'Fecha de reporte:'} {...formItemLayout} >
                                <DatePicker
                                    disabled={true}
                                    value={moment(evr_FechaEnvio, this.dateformat)}
                                    format={dateFormat} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label={'Responsable:'}
                                      labelCol={{xs: {span: 24},sm: {span: 3}}}
                                      wrapperCol={{xs: {span: 24},sm: {span: 21}}}>
                                <Input disabled={true} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem>
                                <div className="new-requirement-list component">
                                    <div className="wrap-table">
                                        <Table
                                            title={() => "Lista de requerimientos"}
                                            bordered
                                            locale={{emptyText: 'No hay datos'}}
                                            size="small"
                                            scroll={{x: 800}}
                                            loading={loadingChange}
                                            dataSource={dataSourceChange}
                                            columns={columns_requirement} />
                                    </div>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem>
                                <div className="new-requirement-list component">
                                    <div className="wrap-table">
                                        <Table
                                            title={() => "RRHH Necesarios"}
                                            bordered
                                            locale={{emptyText: 'No hay datos'}}
                                            size="small"
                                            scroll={{x: 800}}
                                            loading={loadingChange}
                                            dataSource={dataSourceChange}
                                            columns={columns_rrhh} />
                                    </div>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem>
                                <div className="new-requirement-list component">
                                    <div className="wrap-table">
                                        <Table
                                            title={() => "Recursos adicionales necesarios"}
                                            bordered
                                            locale={{emptyText: 'No hay datos'}}
                                            size="small"
                                            scroll={{x: 800}}
                                            loading={loadingChange}
                                            dataSource={dataSourceChange}
                                            columns={columns_requirement_add} />
                                    </div>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem>
                                <div className="new-requirement-list component">
                                    <div className="wrap-table">
                                        <Table
                                            title={() => "Actas de acuerdos realizados"}
                                            bordered
                                            locale={{emptyText: 'No hay datos'}}
                                            size="small"
                                            scroll={{x: 800}}
                                            loading={loadingChange}
                                            dataSource={dataSourceChange}
                                            columns={columns_agreement} />
                                    </div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={'Consideraciones adicionales:'}>
                                <TextArea rows={11} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Afectación a la línea base del proyecto
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label={'Termino:'} {...formItemLayout} >
                                <DatePicker
                                    disabled={true}
                                    value={moment(evr_FechaRespuesta, this.dateformat)}
                                    format={dateFormat}/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={'Tiempo adicional(dias):'} {...formItemLayout}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={'Nuevo termino:'} {...formItemLayout} >
                                <DatePicker
                                    disabled={true}
                                    value={moment(evr_FechaRespuesta, this.dateformat)}
                                    format={dateFormat}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label={'Costo (S/):'} {...formItemLayout}>
                                <Input disabled={true} />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={'Costos adicionales (S/):'} {...formItemLayout}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={'Nuevo Costo (S/):'} {...formItemLayout}>
                                <Input disabled={true}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button type="primary">Guardar</Button>
                    </Row>
                </div>
            </Form>
        );
    }
}

export default  Form.create()(Planning);