import React, {Component} from 'react';
import {
  Modal,
  Form,
  Input,
  Icon,
  Select,
  DatePicker,
  Switch,
  Collapse,
  message,
  Divider,
} from 'antd';
import http from '../../service/http';
import './formRequirementChange.css';

let FormItem = Form.Item;
let Option = Select.Option;
let TextArea = Input.TextArea;
let Panel = Collapse.Panel;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormRequirementChange extends Component {

  constructor(props) {
    super(props);
    this.TitleModal = this.TitleModal.bind(this);
  }

  state = {
    updateRequirement: false,
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

    validateFields((err, {delivery: _delivery, ...form}) => {
      if (!err) {
        form.delivery = _delivery.format('YYYYMMDD');
        http('Requerimiento', 'POST', form, ({success, data}) => {
          if (success) {
            onOk(data);
            resetFields();
          }else{
            message.error("Ups, vuelva a intentarlo nuevamente")
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

  switchTitle(checked) {
    this.setState({
      updateRequirement: checked,
    });
  }

  TitleModal() {
    let {updateRequirement} = this.state;
    return <div className="">
      <Switch
        onChange={this.switchTitle.bind(this)}
        defaultChecked={updateRequirement}/>
      <Divider type="vertical"/>
      {updateRequirement ? <span>Modificar Requerimiento</span> : <span>Nuevo Requerimiento</span>}
    </div>;
  }

  render() {

    let {visible, onOk, onCancel, form} = this.props;
    let {updateRequirement} = this.state;
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form;

    const folderError = isFieldTouched('folder') && getFieldError('folder');
    const dateError = isFieldTouched('date') && getFieldError('date');

    let {TitleModal} = this;

    return (
      <Modal
        title={<TitleModal/>}
        visible={visible}
        onOk={this.onCreate}
        okText="Crear"
        onCancel={onCancel}
        okButtonProps={{disabled: hasErrors(getFieldsError())}}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}
              className="gcp-form">

          <FormItem
            label={'Titulo del requerimiento'}
            validateStatus={folderError ? 'error' : ''}
            help={folderError || ''}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresé un titulo',
                }],
            })(
              updateRequirement
                ? <Select showSearch={true} placeholder="Busca un requerimiento existente">
                  <Option value="lucy">Lucy</Option>
                </Select>
                : <Input type="text" placeholder="Ejemplo. Agregar nuevo estado al usuario."/>
            )}
          </FormItem>

          <FormItem
            label={'Fecha de entrega'}
            validateStatus={this.validateInput('delivery') ? 'error' : ''}
            help={this.validateInput('delivery') || '' || ''}>
            {getFieldDecorator('delivery', {
              rules: [
                {
                  required: true,
                  message: 'Seleccione una fecha',
                }],
            })(
              <DatePicker/>,
            )}
          </FormItem>

          <FormItem
            label={'Detalle del Requerimiento'}
            validateStatus={this.validateInput('description') ? 'error' : ''}
            help={this.validateInput('description') || ''}>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: 'Es necesario que detalle el requerimiento',
                }],
            })(
              <TextArea autosize={{minRows: 2, maxRows: 6}}/>,
            )}
          </FormItem>

          <Collapse bordered={false}>
            <Panel header="Avanzado" key="1">
              <FormItem
                label={'Prioridad'}
                validateStatus={this.validateInput('prioridad') ? 'error' : ''}
                help={this.validateInput('project') || ''}>
                {getFieldDecorator('prioridad', {
                  initialValue: '2',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor seleccione una prioridad',
                    }],
                })(
                  <Select
                    showSearch
                    placeholder="Seleccione Prioridad">
                    <Option value="1">Alta</Option>
                    <Option value="2">Medio</Option>
                    <Option value="3">Baja</Option>
                  </Select>,
                )}
              </FormItem>
              <FormItem
                label={'¿Es requerimiento funcional?'}
                labelCol={{span: 12, offset: 12}}
                help={this.validateInput('applicant') || ''}>
                {getFieldDecorator('isFunctional', {
                  initialValue: true,
                  rules: [],
                })(
                  <Switch checkedChildren="Si" unCheckedChildren="No"
                          onChange={() => {}}/>,
                )}
              </FormItem>

              <FormItem
                label={'¿Requiere documentar?'}
                labelCol={{span: 12, offset: 12}}
                help={this.validateInput('requireDocumentation') || ''}>
                {getFieldDecorator('requireDocumentation', {
                  initialValue: true,
                  rules: [],
                })(
                  <Switch checkedChildren="Si" unCheckedChildren="No"
                          onChange={() => {}}/>,
                )}
              </FormItem>

            </Panel>
          </Collapse>

        </Form>
      </Modal>
    );
  };
}

export default Form.create()(FormRequirementChange);