import React, {Component} from 'react';
import {Modal, Form, Input, Icon, Select, DatePicker, Col} from 'antd';
import http from '../../service/http';
import moment from "moment";

let FormItem = Form.Item;
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

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const dateFormat = 'YYYY-MM-DD';

class FormRRHH extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        OptionPortafalio: [],
        OptionResponsable: [],
        projectDisabled: true
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

    onCreate = (e) =>{
        e.preventDefault();
        let {onOk, form} = this.props;
        let {validateFields, resetFields} = form;

        validateFields((err, form) => {
            if (!err) {

                // let pathName = this.isNew ? 'C0001S0003' : 'C0001S0004';

                http('C0001S0003', 'POST', form, (response) => {
                    if (response === 'OK') {
                        onOk(response);
                        resetFields();
                    }
                });

            }
        });
    };

    componentDidMount(){
        this.props.form.validateFields();
    }

    validateInput(name){
        let {form} = this.props;
        const {getFieldError, isFieldTouched} = form;
        return isFieldTouched(name) && getFieldError(name);
    }

    render() {

        let {visible, onOk, onCancel, form} = this.props;
        let { OptionPortafalio, OptionProject,
            projectDisabled, OptionApplicant,
            OptionResponsable } = this.state;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form;

        const folderError = isFieldTouched('folder') && getFieldError('folder');
        const dateError = isFieldTouched('date') && getFieldError('date');

        return (
            <Modal
                title="Detallar requerimiento"
                visible={visible}
                onOk={this.onCreate}
                okText="Aceptar"
                onCancel={onCancel}
                okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
            >
                <Form onSubmit={this.handleSubmit} className="gcp-form">
                    <FormItem label={'Identificador:'} {...formItemLayout}>
                        <Input disabled={false} />
                    </FormItem>
                    <FormItem label={'Perfil'} {...formItemLayout}>
                            <Select
                                showSearch
                                placeholder="Seleccione Prioridad">
                                <Option value="1">Analista funcional</Option>
                                <Option value="2">Desarrollador</Option>
                                <Option value="3">Jefe de proyecto</Option>
                            </Select>
                    </FormItem>
                    <FormItem label={'Cantidad:'} {...formItemLayout}>
                        <Input disabled={false} />
                    </FormItem>
                    <FormItem label={'Nivel'} {...formItemLayout}>
                        <Select
                            showSearch
                            placeholder="Seleccione Prioridad">
                            <Option value="1">Junior</Option>
                            <Option value="2">Senior</Option>
                        </Select>
                    </FormItem>
                    <FormItem label={'Esfuerzo:'} {...formItemLayout}>
                        <Input disabled={false} />
                    </FormItem>
                    <FormItem label={'Inicio:'} {...formItemLayout} >
                        <DatePicker
                            disabled={false}
                            format={dateFormat} />
                    </FormItem>
                    <FormItem label={'Termino:'} {...formItemLayout} >
                        <DatePicker
                            disabled={false}
                            format={dateFormat} />
                    </FormItem>
                    <FormItem label={'Presupuesto:'} {...formItemLayout}>
                        <Input disabled={false} />
                    </FormItem>
                </Form>
            </Modal>
        );
    };
}

export default  Form.create()(FormRRHH);