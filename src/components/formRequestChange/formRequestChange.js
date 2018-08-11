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

class FormRequestChange extends Component {

  constructor(props) {
    super(props);
    this.fetchPortafolio = this.fetchPortafolio.bind(this);
  }

  state = {
    OptionPortafalio: []
  };

  fetchPortafolio(){
    http('C0003G0001', 'GET', {}, (response) => {
      let OptionPortafalio = response.map(({text, value}) => {
          return <Option value={value}>{text}</Option>;
      });

      this.setState({
        OptionPortafalio
      })
    });
  }

  fetchProject(params){
    this.http('C0004G0001', 'POST', params, (response) => {
      let OptionProject = response.map(({text, value}) => {
        return <Option value={value}>{text}</Option>;
      });

      this.setState({
        OptionProject
      });
    });
  }

  componentDidMount(){
    this.fetchPortafolio();
  }

  render() {

    let {visible, onOk, onCancel, form} = this.props;
    let {OptionPortafalio} = this.state;
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form;

    const userNameError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
        <Modal
            title="Formulario de RFC"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
        >
          <Form onSubmit={() => {}} className="gcp-form">

            <FormItem
                label={'Portafolio'}
                {...formItemLayout}
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}>
              {getFieldDecorator('folder', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione un portafolio',
                  }],
              })(
                  <Select
                      showSearch
                      onChange={(value) => {this.fetchProject(value)}}
                      placeholder="Seleccione Portafolio">
                    {OptionPortafalio}
                  </Select>,
              )}
            </FormItem>

            <FormItem
                label={'Proyecto'}
                {...formItemLayout}
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}>
              {getFieldDecorator('project', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione un portafolio',
                  }],
              })(
                  <Select placeholder="Seleccione Proyecto">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>,
              )}
            </FormItem>

            <FormItem
                label={'Solicitante'}
                {...formItemLayout}
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}>
              {getFieldDecorator('applicant', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione un solicitante',
                  }],
              })(
                  <Select placeholder="Seleccione Solicitante">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>,
              )}
            </FormItem>

            <FormItem
                label={'Responsable'}
                {...formItemLayout}
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}>
              {getFieldDecorator('applicant', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione un Responsable',
                  }],
              })(
                  <Select placeholder="Seleccione Responsable">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>,
              )}
            </FormItem>

            <FormItem
                label={'Fecha'}
                {...formItemLayout}
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    type: 'object', message: 'No es una fecha valida',
                  }],
              })(
                  <DatePicker/>,
              )}
            </FormItem>
            <FormItem
                label={'Asunto'}
                {...formItemLayout}
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}>
              {getFieldDecorator('subject', {
                rules: [
                  {
                    type: 'text', message: 'No es una fecha valida',
                  }],
              })(
                  <TextArea/>,
              )}
            </FormItem>
          </Form>
        </Modal>
    );
  };
}

export default Form.create()(FormRequestChange);