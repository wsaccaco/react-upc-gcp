import React, {Component} from 'react';
import {Button, Card, Col, Form, Input, InputNumber, message, Modal, Row, Select, Switch, Table,} from 'antd';

import http from '../../service/http';
import './formEvalueTechnical.css';
import {getPrioridad,getTipoRecurso} from '../../tools/tools';

let FormItem = Form.Item;
let Option = Select.Option;
let TextArea = Input.TextArea;

const confirm = Modal.confirm;
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

//Cambios de Requerimientos
const _column_template = [
  {
    title: 'Rol',
    dataIndex: 'ltr_Tipo',
    key: 'ltr_Tipo',
    render: (_text, record) => {
        let {text} = getTipoRecurso(_text);
        return text;
    },
  }, {
    title: 'Cantidad',
    dataIndex: 'lrr_Cantidad',
    key: 'lrr_Cantidad',
  }];

class FormEvalueTechnical extends Component {

  constructor(props) {
    super(props);
    this._setStatus = this._setStatus.bind(this)
  }

  state = {
    rfc_Codigo: this.props.rfc_Codigo,

    dataResource: [],
    loading: false,

    ltr_Tipo: 1,
    lrr_Cantidad: 1,
    status: true,

    dataSourceChange: [],
    loadingChange: true,
  };

  onCreate = (e) => {
    e.preventDefault();
    let {onOk, form} = this.props;
    let {validateFields, resetFields} = form;
    let {dataResource}  = this.state;

    validateFields((err, form) => {
      if (!err) {
        form.est_Codigo = form.status ? 5 : 6;
        form.RequerimientoRecurso = dataResource;
        console.log('Received values of form: ', form);

          http('RequerimientoTecnicoEvaluar/update', 'POST', form, (response) => {
              let {success} = response;
              console.log(response);
              if (success === true) {
                  message.success('Se grabo la información.');
                  let {disabled} = this.state;
                  disabled = true;
                  this.state({disabled});

                  onOk();
              } else {
                  message.warning('Ocurrió un error en la actualización.');
              }
          });
      }
    });
  };

  _onChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  _add() {
    this.setState((prevState, Props) => {
      let {ltr_Tipo, lrr_Cantidad, dataResource} = prevState;

      dataResource.push({
          key: dataResource.length,
          ltr_Tipo,
          lrr_Cantidad
      });

      return {
        dataResource,
      };
    });
  }

  _setStatus(value){

    this.setState({
      status : value
    })
  }

  render() {
    let {modalData, visible, onOk, onCancel, form} = this.props;
    let {dataResource, status} = this.state;
    let {pro_Nombre, rfc_Asunto, lir_Nombre, lir_FechaEntrega, lir_Prioridad, lir_Codigo, ...props} = modalData;
    const {getFieldDecorator} = form;
    let {text} = getPrioridad(lir_Prioridad);

    return (
      <Modal
        title={'Evaluación Técnica'}
        visible={visible}
        onOk={this.onCreate}
        okText="Guardar"
        onCancel={onCancel}
        width={1100}
      >

        <Form layout="vertical" onSubmit={() => {}} className="gcp-form">
          {getFieldDecorator('lir_Codigo', {
              initialValue: lir_Codigo
          })(
            <input type="hidden"/>
          )}
          <Row gutter={16}>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="Proyecto"
              >
                <span>{pro_Nombre}</span>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="RFC"
              >
                <span>{rfc_Asunto}</span>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="Requerimiento"
              >
                <span>{lir_Nombre}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="F. Entrega"
              >
                <span>{lir_FechaEntrega}</span>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="Prioridad"
              >
                <span>{text}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Row gutter={16}>
                  <Col span={8}>
                    <Row>
                      <Col>
                        <FormItem
                          label="Aprobado">
                          {getFieldDecorator('status', {
                            valuePropName: 'checked',
                            initialValue: true,
                          })(
                            <Switch onChange={this._setStatus} checkedChildren="Si" unCheckedChildren="No " />
                          )}
                        </FormItem>
                      </Col>
                      <Col>
                        <FormItem
                          label="Tiempo de Desarrollo">
                          {getFieldDecorator('lir_TiempoDesarrollo', {
                            rules: [{required: true, message: 'Definir cantidad de tiempo'}],
                          })(
                            <InputNumber
                              disabled={!status}
                              formatter={value => `${value} horas`}
                              parser={value => value.replace('horas', '')}
                              style={{width: '150px'}}
                              min={1}/>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={16}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <FormItem
                          {...formItemLayout}
                          label="Tipo"
                        >
                          <Select
                            disabled={!status}
                            showSearch
                            placeholder="Escoja Rol"
                            defaultValue="FrontEnd"
                            optionFilterProp="children"
                            onChange={this._onChange.bind(this, 'ltr_Tipo')}
                            filterOption={(
                              input,
                              option) => option.props.children.toLowerCase().
                              indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="1">FrontEnd</Option>
                            <Option value="2">BackEnd</Option>
                            <Option value="3">Analista de Sistemas</Option>
                            <Option value="4">Diseñador UX</Option>
                          </Select>
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem
                          {...formItemLayout}
                          label="Cantidad"
                        >
                          <InputNumber min={1} max={10} disabled={!status} defaultValue={1}
                                       onChange={this._onChange.bind(this,
                                         'lrr_Cantidad')}/>

                          <div style={{
                            display: 'inline-flex',
                            marginLeft: '15px',
                          }}>
                            <Button type="primary" onClick={this._add.bind(
                              this)}>Añadir</Button>
                          </div>

                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Table size="small" dataSource={dataResource}
                             columns={_column_template}/>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(FormEvalueTechnical);
