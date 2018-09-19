import React, {Component} from 'react';
import {Modal, Form, Input, InputNumber, Select, DatePicker, Col} from 'antd';
import http from '../../service/http';
import moment from 'moment';

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

const dateFormat = 'DD-MM-YYYY';

class FormRequirementDetail extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    projectDisabled: true,
  };


  onCreate = (e) => {
    e.preventDefault();
    let {onOk, form} = this.props;
    let {validateFields, resetFields} = form;

    validateFields((err, form) => {
      if (!err) {

        http('RequerimientoPLanificar/update', 'POST', form, ({success}) => {
          if (success) {
            onOk();
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

    let {visible, onOk, onCancel, form, data} = this.props;
    let {lir_Esfuerzo, lir_Desde, lir_Codigo} = data;
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
        okButtonProps={{disabled: hasErrors(getFieldsError())}}
      >
        <Form onSubmit={this.handleSubmit} className="gcp-form">

          {getFieldDecorator('lir_Codigo', {
            initialValue: lir_Codigo,
            rules: [
              {
                required: true,
                message: 'Se requiere el esfuerzo',
              }],
          })(
            <Input type="hidden"/>
          )}

          <FormItem label={'Esfuerzo:'} {...formItemLayout}>

            {getFieldDecorator('lir_Esfuerzo', {
              initialValue: lir_Esfuerzo,
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

            {getFieldDecorator('lir_Desde', {
              initialValue: lir_Desde ? moment( lir_Desde, dateFormat) : null,
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
        </Form>
      </Modal>
    );
  };
}

export default Form.create()(FormRequirementDetail);