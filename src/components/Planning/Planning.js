import React, {Component} from 'react';
import {Button,DatePicker,Form,Input,message,Popconfirm,Radio,Select,Table,Row,
        Col,Modal,Divider} from 'antd';

import './Planning.css';
import '../NewRequirementList/NewRequirementList.css'

import FormRequirementDetail from '../PlanningFormDetail/PlanningFormDetail'
import FormRRHH from '../PlanningFormDetail/PlanningFormRRHH'
import FormResource from '../PlanningFormDetail/PlanningFormResource'

import http from '../../service/http';

let FormItem = Form.Item;
let TextArea = Input.TextArea;

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

class Planning extends Component {
    columns_requirement = [{
        title: 'Id',
        dataIndex: 'lir_Codigo',
        key: 'lir_Codigo',
    }, {
        title: 'Requerimiento',
        dataIndex: 'lir_Nombre'
    }, {
        title: 'Esfuerzo',
        dataIndex: 'lir_Esfuerzo'
    }, {
        title: 'Inicio',
        dataIndex: 'lir_Desde'
    }, {
        title: 'Termino',
        dataIndex: 'lir_Hasta'
    }, {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (text, record) => (
            <span>
                <a href="javascript:;" onClick={() => {
                    this.openDetailRequirement();
                }}> Detallar </a>
            </span>
        ),
    }];

    columns_rrhh = [{
        title: 'Identificador',
        dataIndex: 'lir_Codigo'
    }, {
        title: 'Perfil',
        dataIndex: 'lir_Nombre'
    }, {
        title: 'Cantidad',
        dataIndex: 'lir_Prioridad'
    }, {
        title: 'Nivel',
        dataIndex: 'est_Estado'
    }, {
        title: 'Desde'
    }, {
        title: 'Hasta'
    }, {
        title: 'Presupuesto'
    }, {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (text, record) => (
            <span>
            <a href="javascript:;" onClick={() => {}}> Editar </a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={() => {}}> Quitar </a>
        </span>
        ),
    }];

    columns_requirement_add = [{
        title: 'Recurso',
        dataIndex: 'lir_Codigo'
    }, {
        title: 'Cantidad',
        dataIndex: 'lir_Nombre'
    }, {
        title: 'Desde',
        dataIndex: 'lir_Prioridad'
    }, {
        title: 'Hasta',
        dataIndex: 'est_Estado'
    }, {
        title: 'Presupuesto'
    }, {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (text, record) => (
            <span>
            <a href="javascript:;" onClick={() => {}}> Editar </a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={() => {}}> Quitar </a>
        </span>
        ),
    }];

    constructor(props) {
        super(props);
        this.openDetailRequirement = this.openDetailRequirement.bind(this);
        this.closeDetailRequirement = this.closeDetailRequirement.bind(this);
        this.openRRHH = this.openRRHH.bind(this);
        this.closeRRHH = this.closeRRHH.bind(this);
        this.openResource = this.openResource.bind(this);
        this.closeResource = this.closeResource.bind(this);
        this.titleRRHHTable = this.titleRRHHTable.bind(this);
        this.titleRequirementTable = this.titleRequirementTable.bind(this);
        this.titleAgreementTable = this.titleAgreementTable.bind(this);
    }

    state = {
        dataSourceChange: [],
        loadingChange: true,
        visible: false,
        visibleRRHH: false,
        visibleResource:false,
    };

    openDetailRequirement() {
        this.setState({
            visible: true,
        });
    }

    closeDetailRequirement() {
        this.setState({
            visible: false,
        });
    }
    openRRHH() {
        this.setState({
            visibleRRHH: true,
        });
    }
    closeRRHH() {
        this.setState({
            visibleRRHH: false,
        });
    }
    openResource() {
        this.setState({
            visibleResource: true,
        });
    }
    closeResource() {
        this.setState({
            visibleResource: false,
        });
    }
    titleRRHHTable() {
        return (
            <div className="title-table">
                <strong> RRHH Necesarios </strong>
                <Button type="primary" onClick={() => {
                    this.openRRHH();
                }}>Agregar</Button>
            </div>
        );
    }
    titleRequirementTable() {
        return (
            <div className="title-table">
                <strong> Recursos adicionales necesarios </strong>
                <Button type="primary" onClick={() => {
                    this.openResource();
                }}>Agregar</Button>
            </div>
        );
    }
    titleAgreementTable() {
        return (
            <div className="title-table">
                <strong> Actas de acuerdos realizados </strong>
                <Button type="primary" onClick={() => {
                    this.openDetailRequirement();
                }}>Agregar</Button>
            </div>
        );
    }
    //Cambios de Requerimientos
    fetchRequerimentsChanged() {
        const {rfc_id} = this.props;
        this.setState({
            loadingChange: true
        });

        http('/PlanificarRequerimientos/' + rfc_id , 'GET', {}, (response) => {
            this.setState({
                dataSourceChange: response,
                loadingChange: false
            })
        }, (e) => {
            console.error(e)
        } );
    }

    componentDidMount() {
        //Cambios de Requerimientos
        this.fetchRequerimentsChanged()
    }

    render() {
        let {form, rfc_id} = this.props;
        let {visible, visibleRRHH, visibleResource, data, loading} = this.state;
        let {
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
                                            columns={this.columns_requirement} />
                                        <FormRequirementDetail visible={visible} onOk={this.onOk}
                                                               onCancel={this.closeDetailRequirement}/>
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
                                            title={this.titleRRHHTable}
                                            bordered
                                            locale={{emptyText: 'No hay datos'}}
                                            size="small"
                                            scroll={{x: 800}}
                                            loading={loadingChange}
                                            dataSource={dataSourceChange}
                                            columns={this.columns_rrhh} />
                                        <FormRRHH visible={visibleRRHH} onOk={this.onOk}
                                                               onCancel={this.closeRRHH}/>
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
                                            title={this.titleRequirementTable}
                                            bordered
                                            locale={{emptyText: 'No hay datos'}}
                                            size="small"
                                            scroll={{x: 800}}
                                            loading={loadingChange}
                                            dataSource={dataSourceChange}
                                            columns={this.columns_requirement_add} />
                                        <FormResource visible={visibleResource} onOk={this.onOk}
                                                  onCancel={this.closeResource}/>
                                    </div>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label={'Consideraciones adicionales:'}>
                                <TextArea rows={5} />
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