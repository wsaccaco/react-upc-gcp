import React, {Component} from 'react';
import {Modal, Form, Input, Icon, Select, DatePicker, Col, InputNumber} from 'antd';
import http from '../../service/http';

import moment from "moment";

let FormItem = Form.Item;
let Option = Select.Option;

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

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const dateFormat = 'YYYY-MM-DD';

class FormRRHH extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        projectDisabled: true,
        dataRRHH: this.props.dataRRHH,
        dataUpdate:this.props.dataUpdate,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let {form, onOk, dataUpdate} = this.props;

        form.validateFields((err, form) => {
            if (!err) {
                //console.log(this.props.dataUpdate);
                // let pathName = this.isNew ? 'C0001S0003' : 'C0001S0004';
                this.http('C0001S0003', 'POST', form, (response) => {
                    if (response === 'OK') {
                        onOk(response);
                    }
                });
            }
        });
    };

    onCreate = (e) => {
        e.preventDefault();
        let {onOk, form} = this.props;
        let {validateFields, resetFields} = form;

        validateFields((err, form) => {
            if (!err) {

                let pathName = this.props.dataUpdate ? 'rrhh/update' : 'rrhh';
                http(pathName, 'POST', form, (response) => {
                    if (response) {
                        onOk(response);
                        resetFields();
                    }
                });

            }
        });
    };

    componentDidMount() {
        this.props.form.validateFields();
    }

    validateInput(name) {
        let {form} = this.props;
        const {getFieldError, isFieldTouched} = form;
        return isFieldTouched(name) && getFieldError(name);
    }

    render() {

        let { visible, onOk, onCancel, form, rfc_Codigo, dataRRHH } = this.props;
        const {getFieldDecorator, getFieldsError} = form;
        let {rrhh_Codigo,rrhh_Identificador,tip_Codigo, rrhh_Cantidad, niv_Codigo,
            rrhh_Esfuerzo, rrhh_FecInicio,
            rrhh_FechaTermino, rrhh_Presupuesto } = dataRRHH || {};

        return (
            <Modal
                title="Registro de RRHH"
                visible={visible}
                onOk={this.onCreate}
                okText="Aceptar"
                onCancel={onCancel}
                okButtonProps={{disabled: hasErrors(getFieldsError())}}
            >
                <Form onSubmit={this.handleSubmit} className="gcp-form">
                    <FormItem label={'Identificador:'} {...formItemLayout}>
                        {getFieldDecorator('rfc_Codigo', {
                            initialValue: rfc_Codigo
                        })(
                            <Input type={'hidden'}
                                   min={0} disabled={false}/>
                        )}
                        {getFieldDecorator('rrhh_Codigo', {
                            initialValue: rrhh_Codigo
                        })(
                            <Input type={'hidden'}
                                   min={0} disabled={false}/>
                        )}
                        {getFieldDecorator('rrhh_Identificador', {
                            initialValue: rrhh_Identificador,
                            rules: [
                                {
                                    required: true,
                                    message: 'Se requiere el identificador',
                                }],
                        })(
                            <Input
                                min={0} disabled={false}/>
                        )}
                    </FormItem>
                    <FormItem label={'Perfil'} {...formItemLayout}>
                        {getFieldDecorator('tip_Codigo', {
                            initialValue: `${tip_Codigo || 2}`,
                            rules: [
                                {
                                    required: true,
                                    message: 'Se requiere el perfil',
                                }],
                        })(
                            <Select
                                showSearch
                                placeholder="Seleccione perfil">
                                <Option value="1">Analista funcional</Option>
                                <Option value="2">Desarrollador</Option>
                                <Option value="3">Jefe de proyecto</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label={'Cantidad:'} {...formItemLayout}>
                        {getFieldDecorator('rrhh_Cantidad', {
                            initialValue: rrhh_Cantidad,
                            rules: [
                                {
                                    required: true,
                                    message: 'Se requiere la cantidad',
                                }],
                        })(
                            <InputNumber
                                min={0} disabled={false}/>
                        )}
                    </FormItem>
                    <FormItem label={'Nivel'} {...formItemLayout}>
                        {getFieldDecorator('niv_Codigo', {
                            initialValue: `${niv_Codigo || 2}`,
                            rules: [
                                {
                                    required: true,
                                    message: 'Se requiere el nivel',
                                }],
                        })(
                            <Select
                                showSearch
                                placeholder="Seleccione nivel">
                                <Option value="1">Junior</Option>
                                <Option value="2">Senior</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label={'Esfuerzo:'} {...formItemLayout}>
                        {getFieldDecorator('rrhh_Esfuerzo', {
                            initialValue: rrhh_Esfuerzo,
                            rules: [
                                {
                                    required: true,
                                    message: 'Se requiere el esfuerzo',
                                }],
                        })(
                            <InputNumber
                                formatter={value => `${value} horas`}
                                parser={value => value.replace(' horas', '')}
                                min={0} disabled={false}/>
                        )}
                    </FormItem>
                    <FormItem label={'Inicio:'} {...formItemLayout} >
                        {getFieldDecorator('rrhh_FecInicio', {
                            initialValue: rrhh_FecInicio ? moment(rrhh_FecInicio, 'DD-MM-YYYY') : null ,
                            rules: [
                                {
                                    required: true,
                                    message: 'Se requiere una fecha de inicio',
                                }],
                        })(
                            <DatePicker
                                disabled={false}
                                format={dateFormat}/>
                        )}
                    </FormItem>
                    <FormItem label={'Termino:'} {...formItemLayout} >
                        {getFieldDecorator('rrhh_FechaTermino', {
                            initialValue: rrhh_FechaTermino ? moment(rrhh_FechaTermino, 'DD-MM-YYYY') : null ,
                            rules: [
                                {
                                    required: true,
                                    message: 'Se requiere una fecha de termino',
                                }],
                        })(
                            <DatePicker
                                disabled={false}
                                format={dateFormat}/>
                        )}
                    </FormItem>
                    <FormItem label={'Presupuesto:'} {...formItemLayout}>
                        {getFieldDecorator('rrhh_Presupuesto', {
                            initialValue: rrhh_Presupuesto,
                            rules: [
                                {
                                    required: true,
                                    message: 'Se requiere el presupuesto',
                                }],
                        })(
                            <InputNumber
                                min={0} disabled={false}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    };
}

export default  Form.create()(FormRRHH);