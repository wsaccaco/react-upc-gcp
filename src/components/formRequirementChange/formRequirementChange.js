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
import moment from 'moment'
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
    rfc_Codigo: this.props.rfc_Codigo,
    requirementSource: this.props.requirementSource,
    updateRequirement: false
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
    let {onOk, form, rfc_Codigo} = this.props;
    let {validateFields, resetFields} = form;

    validateFields((err, {delivery: _delivery, ...form}) => {
      if (!err) {
        form.delivery = _delivery.format('YYYYMMDD');
        form.rfc_Codigo = rfc_Codigo;
        let service = 'Requerimiento';
        if (form.lir_Codigo) {
          service = 'Requerimiento/update';
        }

        http(service, 'POST', form, ({success, data}) => {
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

  static getDerivedStateFromProps(nextProps, prevState){
    let { requirementSource } = nextProps;
    return {
      requirementSource
    }
  }

  validateInput(name) {
    let {form} = this.props;
    const {getFieldError, isFieldTouched} = form;
    return isFieldTouched(name) && getFieldError(name);
  }

  TitleModal() {
    let {updateRequirement} = this.props;
    return <div className="">
      {updateRequirement ? <span>Modificar Requerimiento</span> : <span>Nuevo Requerimiento</span>}
    </div>;
  }

  disabledStartDate(startValue){
    if(!startValue){
      return false
    }
    return startValue.valueOf() <= moment().subtract(1,'days').startOf('day').valueOf();
  }

  render() {

    let {visible, onOk, onCancel, form, updateRequirement} = this.props;
    let {requirementSource} = this.state;
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form;



    const folderError = isFieldTouched('folder') && getFieldError('folder');
    const dateError = isFieldTouched('date') && getFieldError('date');

    let {lir_Nombre, lir_Resumen, lir_Prioridad, lir_EsFuncional,
      lir_RequiereDocumentar, lir_FechaEntrega, lir_Codigo} = requirementSource || {};

    let {TitleModal} = this;
    let _modalProps = {
      okText:"Crear"
    }
    if (updateRequirement) {
      _modalProps = {
        okText:"Actualizar"
      }
    }

    return (
      <Modal
        title={<TitleModal/>}
        visible={visible}
        onOk={this.onCreate}
        {..._modalProps}
        onCancel={onCancel}
        okButtonProps={{disabled: hasErrors(getFieldsError())}}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}
              className="gcp-form">

          {getFieldDecorator('lir_Codigo', {
            initialValue: lir_Codigo
          })(
            <Input type="hidden"/>
          )}

          <FormItem
            label={'Titulo del requerimiento'}
            validateStatus={folderError ? 'error' : ''}
            help={folderError || ''}>
            {getFieldDecorator('title', {
              initialValue: lir_Nombre,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresé un titulo',
                }],
            })(
              <Input type="text" placeholder="Ejemplo. Agregar nuevo estado al usuario."/>
            )}
          </FormItem>

          <FormItem
            label={'Fecha de entrega'}
            validateStatus={this.validateInput('delivery') ? 'error' : ''}
            help={this.validateInput('delivery') || '' || ''}>
            {getFieldDecorator('delivery', {
              initialValue: lir_FechaEntrega ? moment(lir_FechaEntrega, 'DD-MM-YYYY') : null ,
              rules: [
                {
                  required: true,
                  message: 'Seleccione una fecha',
                }],
            })(
              <DatePicker
                disabledDate={this.disabledStartDate.bind(this)}
                format={'DD-MM-YYYY'}/>,
            )}
          </FormItem>

          <FormItem
            label={'Detalle del Requerimiento'}
            validateStatus={this.validateInput('description') ? 'error' : ''}
            help={this.validateInput('description') || ''}>
            {getFieldDecorator('description', {
              initialValue: lir_Resumen,
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
                  initialValue: `${lir_Prioridad || 2}`,
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
                help={this.validateInput('isFunctional') || ''}>
                {getFieldDecorator('isFunctional', {
                  valuePropName: 'checked',
                  initialValue: lir_EsFuncional || false,
                  rules: [],
                })(
                  <Switch checkedChildren="Si" unCheckedChildren="No"/>,
                )}
              </FormItem>

              <FormItem
                label={'¿Requiere documentar?'}
                labelCol={{span: 12, offset: 12}}
                help={this.validateInput('requireDocumentation') || ''}>
                {getFieldDecorator('requireDocumentation', {
                  valuePropName: 'checked',
                  initialValue: lir_RequiereDocumentar || false,
                  rules: [],
                })(
                  <Switch checkedChildren="Si" unCheckedChildren="No" />,
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