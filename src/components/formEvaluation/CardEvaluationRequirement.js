import React, {Component} from 'react';
import {
  Modal, Form, Input, InputNumber, Select, DatePicker, Switch, Collapse,
  message, Divider, Row, Col, Card
} from 'antd';
import './CardEvaluationRequirement.css'

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

  handleSubmit = (e) => {

  };


  componentDidMount() {
    this.props.form.validateFields();
  }


  render() {
    let {form} = this.props;
    let {data: {lir_Nombre, lir_CostoInicial, pri_Prioridad, lir_Dias, lir_Aprobado,  ..._data, }} = this.state;

    console.log(_data)

    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form;

    const folderError = isFieldTouched('folder') && getFieldError('folder');


    return (
      <Card title={lir_Nombre} className="card-requirement">
        <Form  layout="vertical" onSubmit={this.handleSubmit}
              className="gcp-form">
          <Row gutter={10} type="flex" align="middle">
            <Col span={9}>
              <FormItem
                label={'¿Aprobado? :'}
                validateStatus={folderError ? 'error' : ''}
                {...formItemLayout_small}
                help={folderError || ''}>
                {getFieldDecorator('approved', {
                  initialValue: lir_Aprobado,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingresé un titulo',
                    }],
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
                {getFieldDecorator('impact', {
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
                {getFieldDecorator('title', {
                  initialValue : lir_Dias,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingresé un titulo',
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
                {getFieldDecorator('priority', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingresé un titulo',
                    }],
                  initialValue: pri_Prioridad
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
                label={'Costo Final :'}
                validateStatus={folderError ? 'error' : ''}
                {...formItemLayout}
                help={folderError || ''}>
                {getFieldDecorator('price', {
                  initialValue:0,
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

        </Form>
      </Card>
    );
  };
}

export default Form.create()(CardEvaluationRequirement);