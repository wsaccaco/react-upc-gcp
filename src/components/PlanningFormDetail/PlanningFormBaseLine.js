import React, {Component} from 'react';
import {Modal, Form, Input, Icon, Select, DatePicker, Col, InputNumber} from 'antd';
import http from '../../service/http';
import moment from "moment";

let FormItem = Form.Item;

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

class FormBaseLine extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        projectDisabled: true,
        dataResource: this.props.dataResource,
        dataUpdate: this.props.dataUpdate,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let {form, onOk} = this.props;

        form.validateFields((err, form) => {
            if (!err) {
                console.log('submit');
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
                let pathName = this.props.dataUpdate ? 'RecursoAdicional/update' : 'RecursoAdicional';
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
        let {visible, onOk, onCancel, form} = this.props;
        const {getFieldDecorator, getFieldsError} = form;
        return (
            <Form onSubmit={this.handleSubmit} className="gcp-form">
                <FormItem label={'Recurso:'} {...formItemLayout}>
                    {getFieldDecorator('rfc_Codigo', {
                        initialValue: this.props.rfc_Codigo
                    })(
                        <Input type={'hidden'}
                               min={0} disabled={false}/>
                    )}
                    {getFieldDecorator('rad_Codigo', {
                        initialValue: this.props.dataResource === null ? '' : this.props.dataResource.rad_Codigo,
                    })(
                        <Input type={'hidden'}
                               min={0} disabled={false}/>
                    )}
                    {getFieldDecorator('rad_Identificador', {
                        initialValue: this.props.dataResource === null ? '' : this.props.dataResource.rad_Identificador,
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
                <FormItem label={'Cantidad:'} {...formItemLayout}>
                    {getFieldDecorator('rad_Cantidad', {
                        initialValue: this.props.dataResource === null ? '' : this.props.dataResource.rad_Cantidad,
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
                <FormItem label={'Inicio:'} {...formItemLayout} >
                    {getFieldDecorator('rad_FecInicio', {
                        initialValue: this.props.dataResource === null ? null : moment(this.props.dataResource.rad_FecInicio, 'DD-MM-YYYY'),
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
                    {getFieldDecorator('rad_FechaTermino', {
                        initialValue: this.props.dataResource === null ? null : moment(this.props.dataResource.rad_FechaTermino, 'DD-MM-YYYY'),
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
                    {getFieldDecorator('rad_Presupuesto', {
                        initialValue: this.props.dataResource === null ? '' : this.props.dataResource.rad_Presupuesto,
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
        );
    };
}
export default  Form.create()(FormBaseLine);