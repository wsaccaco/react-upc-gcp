import React, {Component} from 'react';
import {Modal, Form, Input, Select, Row, Col, Card, Table, Checkbox, message} from 'antd';

import http from '../../service/http';
import './formPlanningRisk.css';
import DetailsFlow from "../DetailsFlow/DetailsFlow";
import {getPrioridad} from '../../tools/tools'

let FormItem = Form.Item;
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

class FormPlanningRisk extends Component {

    constructor(props) {
        super(props);
        this.fetchImpacto = this.fetchImpacto.bind(this);
    }

    state = {
        rfc_Codigo: this.props.rfc_Codigo,

        dataSource: {
            por_Nombre: null,
            per_Email: null,
            pro_Nombre: null,
            per_Nombre: null,
            rfc_Asunto: '',
        },
        loading: false,

        dataSourceChange: [],
        loadingChange: true,

        imp_Codigo: null,
        impactoDisabled: false,
        OptionImpacto: [],
        lineabaseDisabled: false,
        evr_LineaBase: false,
        presupuestoDisabled: false,
        evr_Presupuesto: false,
        informeDisabled: false,
        evr_Informe: null
    };

    //Detalles del RFC
    fetchDetails() {
        let {rfc_Codigo} = this.props;
        this.setState({
            loading: true,
        });
        try {
            http('C0001G0002', 'POST', {rfc_Codigo},
                ({por_Nombre, per_Email, pro_Nombre, per_Nombre, rfc_Asunto}) => {
                    this.setState({
                        dataSource: {
                            por_Nombre,
                            per_Email,
                            pro_Nombre,
                            per_Nombre,
                            rfc_Asunto,
                        },
                        loading: false,
                    });
                }, (e) => {
                    message.error("Ups, vuelva a intentarlo nuevamente")
                });
        }catch (e) {

        }
    }

    //Cambios de Requerimientos
    fetchRequerimentsChanged() {
        const {rfc_Codigo} = this.props;
        this.setState({
            loadingChange: true
        });
        http('/rfc/' + rfc_Codigo + '/nuevosRequerimientos', 'GET', {}, (response) => {
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
        let {rfc_Codigo, esr_Codigo} = this.props;
        http('EvaluacionRiesgo/' + rfc_Codigo, 'GET', {}, (response) => {
            let {imp_Codigo,
                evr_Informe,
                evr_LineaBase,
                evr_Presupuesto} = response[0];
            console.log(imp_Codigo,evr_Informe,evr_LineaBase,evr_Presupuesto);
            let {impactoDisabled,
                informeDisabled,
                lineabaseDisabled,
                presupuestoDisabled} = this.state;
            if (esr_Codigo === 3){
                impactoDisabled = true;
                informeDisabled = true;
                lineabaseDisabled = true;
                presupuestoDisabled = true;
            }
            this.setState({
                impactoDisabled,
                imp_Codigo,
                informeDisabled,
                evr_Informe,
                lineabaseDisabled,
                evr_LineaBase,
                presupuestoDisabled,
                evr_Presupuesto});
        }, (e) => {
            console.error(e)
        });
    }

    onCreate = (e) => {
        e.preventDefault();
        let {onOk, form, rfc_Codigo} = this.props;
        let {validateFields, resetFields} = form;

        validateFields((err, form) => {
            if (!err) {
                console.log('Received values of form: ', form);

                confirm({
                    title: 'Seguro de enviar la evaluación a Gestión de Cambio?',
                    content: 'Se enviará la información de Evaluación de Riesgo al proceso de gestión de cambio.',
                    onOk: () => {
                        console.log('OK');
                        try{
                            http('EvaluacionRiesgoU', 'POST', form, (response) => {
                                let {evr_Codigo} = response;
                                if (evr_Codigo > 0) {
                                    message.success('Se envio la información a Gestión de Cambio.');
                                    let {impactoDisabled,
                                        informeDisabled,
                                        lineabaseDisabled,
                                        presupuestoDisabled} = this.state;

                                    impactoDisabled = true;
                                    informeDisabled = true;
                                    lineabaseDisabled = true;
                                    presupuestoDisabled = true;

                                    console.log(this);
                                    this.setState({
                                        impactoDisabled,
                                        informeDisabled,
                                        lineabaseDisabled,
                                        presupuestoDisabled
                                    });

                                    onOk();
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
    };

    componentDidMount() {
        this.fetchDetails();
        this.fetchRequerimentsChanged();
        this.fetchImpacto();
        this.fetchEvaluacionRiesgo();
    }

    render() {
        let {rfc_Codigo, visible, onOk, onCancel, form} = this.props;
        let {
            dataSource,
            loading,

            dataSourceChange,
            loadingChange,

            imp_Codigo,
            impactoDisabled,
            OptionImpacto,
            lineabaseDisabled,
            evr_LineaBase,
            presupuestoDisabled,
            evr_Presupuesto,
            informeDisabled,
            evr_Informe,
        } = this.state;

        const {getFieldDecorator} = form;

        return(
            <Modal
                title={"Evaluación de Riesgo"}
                visible={visible}
                onOk={this.onCreate}
                okText="Guardar"
                onCancel={onCancel}
                width={1200}
                // okButtonProps={{disabled: hasErrors(getFieldsError())}}
            >
                <Row className="gutter-row" gutter={16}>
                    <Col span={24}>
                        <DetailsFlow loading={loading} dataSource={dataSource}/>
                    </Col>
                </Row>

                <Row>
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

                <Form layout="vertical" onSubmit={this.handleSubmit} className="gcp-form">
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem>
                                {getFieldDecorator('rfc_Codigo', {
                                    rules: [{required: true, message: 'Definir el RFC'}],
                                    initialValue: rfc_Codigo
                                })(
                                    <Input type="hidden"/>
                                )}
                            </FormItem>

                            <FormItem
                                label={'Impacto'}
                                {...formItemLayout}
                            >
                                {getFieldDecorator('imp_Codigo', {
                                    rules: [{required: true, message: 'Seleccionar Impacto'}],
                                    initialValue: imp_Codigo
                                })(
                                    <Select
                                        showSearch
                                        disabled={impactoDisabled}
                                        placeholder="Seleccione Impacto">
                                        {OptionImpacto}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label={'Afectación'}
                            >
                                {getFieldDecorator('evr_LineaBase', {
                                    rules: [],
                                    valuePropName: 'checked',
                                    initialValue: evr_LineaBase
                                })(
                                    <Checkbox disabled={lineabaseDisabled}>Línea Base</Checkbox>
                                )}
                                {getFieldDecorator('evr_Presupuesto', {
                                    rules: [],
                                    valuePropName: 'checked',
                                    initialValue: evr_Presupuesto
                                })(
                                    <Checkbox disabled={presupuestoDisabled}>Presupuesto</Checkbox>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem
                                label={'Observación'}
                                {...formItemLayout}>
                                {getFieldDecorator('evr_Informe', {
                                    rules: [{required: true, message: 'Ingrese un informe'}],
                                    initialValue: evr_Informe
                                })(
                                    <TextArea
                                        disabled={informeDisabled}
                                        placeholder="Informe"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(FormPlanningRisk);
