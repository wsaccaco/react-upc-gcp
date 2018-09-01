import React, {Component} from 'react';
import {
  Form, Button, InputNumber, Select, Input, Switch, Collapse,
  message, Divider, Row, Col, Card
} from 'antd';
import './CardEvaluationRequirement.css'
import http from '../../service/http';

let FormItem = Form.Item;
let Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const formItemLayout_small = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class CardEvaluationRequirement extends Component {

  constructor(props) {
    super(props);
    let {data} = props;
    this.state = {
      data
    }
  }

  fetchPostRequerimientoPlanificado(values){
    http(`RequerimientoPlanificado`, 'POST', values, (success) => {

      if(success){
        console.log('success')
      }else{
        console.log('error')
      }

    }, (e) => {
      console.error(e);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.fetchPostRequerimientoPlanificado(values);
      }
    })
  };


  componentDidMount() {
    this.props.form.validateFields();
  }


  render() {
    let {form} = this.props;
    let {data: {
      lir_Nombre, lir_CostoInicial, pri_Prioridad, lir_Dias,
      lir_Aprobado, lir_CostoAsignado, lir_Codigo, lir_ImpactoRiesgo}} = this.state;

    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form;

    const folderError = isFieldTouched('folder') && getFieldError('folder');


    return (
      <Card title={lir_Nombre} className="card-requirement">
        <Form  layout="vertical" onSubmit={this.handleSubmit}
              className="gcp-form">

          {getFieldDecorator('lir_Codigo', {
            initialValue: lir_Codigo,
          })(
            <Input type="hidden"/>
          )}

          <Row gutter={10} type="flex" align="middle">
            <Col span={9}>
              <FormItem
                label={'¿Aprobado? :'}
                validateStatus={folderError ? 'error' : ''}
                {...formItemLayout_small}
                help={folderError || ''}>
                {getFieldDecorator('lir_Aprobado', {
                  valuePropName: 'checked',
                  initialValue: lir_Aprobado,
                })(
                  <Switch/>
                )}
              </FormItem>
            </Col>
            <Col span={15}>
              <FormItem
                label={'Impacto Riesgo :'}
                validateStatus={folderError ? 'error' : ''}
                {...formItemLayout}
                help={folderError || ''}>
                {getFieldDecorator('lir_ImpactoRiesgo', {
                  initialValue: lir_ImpactoRiesgo,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingresé un titulo',
                    }],
                })(
                  <Select>
                    <Option value="alto">Alto</Option>
                    <Option value="medio">Medio</Option>
                    <Option value="bajo">Bajo</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={10} type="flex" align="middle">
            <Col span={9}>
              <FormItem
                label={'Duración :'}
                validateStatus={folderError ? 'error' : ''}
                {...formItemLayout_small}
                help={folderError || ''}>
                {getFieldDecorator('lir_Dias', {
                  initialValue : lir_Dias,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingresé los días requeridos',
                    }],
                })(
                  <InputNumber
                    min={0}
                    style={{width: '100%'}}
                    formatter={value => `${value} días`}
                    parser={value => value.replace(' días', '')}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={15}>
              <FormItem
                label={'Prioridad :'}
                validateStatus={folderError ? 'error' : ''}
                {...formItemLayout}
                help={folderError || ''}>
                {getFieldDecorator('pri_Prioridad', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingresé un titulo',
                    }],
                  initialValue: pri_Prioridad
                })(
                  <Select>
                    <Option value="alta">Alto</Option>
                    <Option value="media">Medio</Option>
                    <Option value="baja">Bajo</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={10} type="flex" align="middle">
            <Col span={12}>
              <FormItem
                label={'Costo Inicial :'}
                validateStatus={folderError ? 'error' : ''}
                {...formItemLayout_small}
                help={folderError || ''}>
                  <span>{lir_CostoInicial}</span>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label={'Costo Asignado :'}
                validateStatus={folderError ? 'error' : ''}
                {...formItemLayout}
                help={folderError || ''}>
                {getFieldDecorator('lir_CostoAsignado', {
                  initialValue: lir_CostoAsignado,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingresé un titulo',
                    }],
                })(
                  <InputNumber
                    min={0}
                    formatter={value => `S/ ${value}`}
                    parser={value => value.replace('S/ ', '')}
                    style={{width: '100%'}} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="end">
            <Col >
              <Button type="primary" icon="search" htmlType="submit">Guardar</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };
}

export default Form.create()(CardEvaluationRequirement);