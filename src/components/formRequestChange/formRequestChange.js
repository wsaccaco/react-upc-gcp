import React, {Component} from 'react';
import {Modal, Form, Input, Icon, Select, DatePicker} from 'antd';
import http from '../../service/http';

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

class FormRequestChange extends Component {

  constructor(props) {
    super(props);
    this.fetchPortafolio = this.fetchPortafolio.bind(this);
    this.fetchProject = this.fetchProject.bind(this);
  }

  state = {
    OptionPortafalio: [],
    OptionResponsable: [],
    projectDisabled: true
  };

  fetchPortafolio(){
    http('C0003G0001', 'GET', {}, (response) => {
      let OptionPortafalio = response.map(({text, value}, index) => {
          return <Option key={index} value={value}>{text}</Option>;
      });

      this.setState({
        OptionPortafalio
      })
    });
  }

  fetchProject(params){
    http('C0004G0001', 'POST', params, (response) => {
      let OptionProject = response.map(({text, value}, index) => {
        return <Option key={index} value={value}>{text}</Option>;
      });

      this.setState({
        OptionProject,
        projectDisabled: false
      });
    });
  }

  fetchApplicant() {
    http('C0005G0001', 'GET', {}, (response) => {
      let OptionApplicant = response.map(({text, value}, index) => {
        return <Option key={index} value={value}>{text}</Option>;
      });

      this.setState({
        OptionApplicant
      });

    });
  }

  fetchResponsable() {
    http('C0005G0002', 'GET', {}, (response) => {
      let OptionResponsable = response.map(({text, value}, index) => {
        return <Option key={index} value={value}>{text}</Option>;
      });

      this.setState({
        OptionResponsable
      });
    });
  }

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
    this.fetchPortafolio();
    this.fetchApplicant();
    this.fetchResponsable();
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
            title="Formulario de RFC"
            visible={visible}
            onOk={this.onCreate}
            okText="Crear"
            onCancel={onCancel}
            okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
        >
          <Form onSubmit={this.handleSubmit} className="gcp-form">

            <FormItem
                label={'Portafolio'}
                {...formItemLayout}
                validateStatus={folderError ? 'error' : ''}
                help={folderError || ''}>
              {getFieldDecorator('NumPortafolio', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione un portafolio',
                  }],
              })(
                  <Select
                      showSearch
                      onChange={(value) => {this.fetchProject({NumPortafolio:value})}}
                      placeholder="Seleccione Portafolio">
                    {OptionPortafalio}
                  </Select>,
              )}
            </FormItem>

            <FormItem
                label={'Proyecto'}
                {...formItemLayout}
                validateStatus={this.validateInput('project') ? 'error' : ''}
                help={this.validateInput('project') || ''}>
              {getFieldDecorator('pro_Codigo', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione un portafolio',
                  }],
              })(
                  <Select
                      showSearch
                      disabled={projectDisabled}
                      placeholder="Seleccione Proyecto">
                    {OptionProject}
                  </Select>,
              )}
            </FormItem>

            <FormItem
                label={'Solicitante'}
                {...formItemLayout}
                validateStatus={this.validateInput('applicant') ? 'error' : ''}
                help={this.validateInput('applicant') || ''}>
              {getFieldDecorator('per_Codigo', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione un solicitante',
                  }],
              })(
                  <Select showSearch placeholder="Seleccione Solicitante">
                    {OptionApplicant}
                  </Select>,
              )}
            </FormItem>

            <FormItem
                label={'Responsable'}
                {...formItemLayout}
                validateStatus={this.validateInput('responsable') ? 'error' : ''}
                help={this.validateInput('responsable') || ''}>
              {getFieldDecorator('GCP13_EncargadosRFC_per_Codigo', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione un Responsable',
                  }],
              })(
                  <Select showSearch placeholder="Seleccione Responsable">
                    {OptionResponsable}
                  </Select>,
              )}
            </FormItem>

            <FormItem
                label={'Fecha'}
                {...formItemLayout}
                validateStatus={dateError ? 'error' : ''}
                help={dateError || ''}>
              {getFieldDecorator('rfc_FechaSolicitud', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione una fecha',
                  },
                  {
                    type: 'object',
                    message: 'No es una fecha valida',
                  }],
              })(
                  <DatePicker/>,
              )}
            </FormItem>
            <FormItem
                label={'Asunto'}
                {...formItemLayout}
                validateStatus={this.validateInput('subject') ? 'error' : ''}
                help={this.validateInput('subject') || ''}>
              {getFieldDecorator('rfc_Asunto', {
                rules: [],
              })(
                  <TextArea/>,
              )}
            </FormItem>
          </Form>
        </Modal>
    );
  };
}

export default  Form.create()(FormRequestChange);