import React, {Component} from 'react';
import {Modal, Form, Input, Select, Row, Col, Card, Table, Checkbox, message} from 'antd';

import http from '../../service/http';
import './formEvalueTechnical.css';
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


    onCreate = (e) => {
        e.preventDefault();
        let {onOk, form, rfc_Codigo} = this.props;
        let {validateFields, resetFields} = form;

        validateFields((err, form) => {
            if (!err) {
                console.log('Received values of form: ', form);
            }
        });
    };

    componentDidMount() {

    }

    render() {
        let {rfc_Codigo, visible, onOk, onCancel, form} = this.props;
        let { } = this.state;

        const {getFieldDecorator} = form;

        return(
            <Modal
                title={"Evaluación de Riesgo"}
                visible={visible}
                onOk={this.onCreate}
                okText="Guardar"
                onCancel={onCancel}
                width={1200}
            >

                <Form layout="vertical" onSubmit={ () => {}} className="gcp-form">
                    Hola Form
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(FormPlanningRisk);
