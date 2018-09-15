import React, {Component} from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Card,
  InputNumber,
  Table,
  Switch,
  Button,
} from 'antd';

import http from '../../service/http';
import './formEvalueTechnical.css';
import DetailsFlow from '../DetailsFlow/DetailsFlow';
import {getPrioridad} from '../../tools/tools';

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
    dataIndex: 'rol',
    key: 'rol',
  }, {
    title: 'Cantidad',
    dataIndex: 'cantidad',
    key: 'cantidad',
  }];

class FormEvalueTechnical extends Component {

  constructor(props) {
    super(props);
    this._setStatus = this._setStatus.bind(this)
  }

  state = {
    rfc_Codigo: this.props.rfc_Codigo,

    dataSource: [],
    loading: false,

    cantidad: 1,
    rol: 'FrontEnd',
    status: true,

    dataSourceChange: [],
    loadingChange: true,
  };

  onCreate = (e) => {
    e.preventDefault();
    let {onOk, form, rfc_Codigo} = this.props;
    let {validateFields, resetFields} = form;

    validateFields((err, form) => {
      if (!err) {
        console.log('Received values of form: ', form);
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
      let {rol, cantidad, dataSource} = prevState;

      dataSource.push({
        rol,
        cantidad,
        key: dataSource.length,
      });

      return {
        dataSource,
      };
    });
  }

  _setStatus(value){

    this.setState({
      status : value
    })
  }

  render() {
    let {rfc_Codigo, visible, onOk, onCancel, form} = this.props;
    let {dataSource, status} = this.state;

    const {getFieldDecorator} = form;

    return (
      <Modal
        title={'Evaluación de Riesgo'}
        visible={visible}
        onOk={this.onCreate}
        okText="Guardar"
        onCancel={onCancel}
        width={1100}
      >

        <Form layout="vertical" onSubmit={() => {}} className="gcp-form">
          <Row gutter={16}>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="Proyecto"
              >
                <span>Hola</span>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="RFC"
              >
                <span>Hola</span>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="Requerimiento"
              >
                <span>Hola</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="F. Entrega"
              >
                <span>Hola</span>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="Prioridad"
              >
                <span>Hola</span>
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

                          {getFieldDecorator('userName', {
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

                          <InputNumber
                            disabled={!status}
                            formatter={value => `${value} horas`}
                            parser={value => value.replace('horas', '')}
                            style={{width: '150px'}}
                            min={1}/>

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
                            onChange={this._onChange.bind(this, 'rol')}
                            filterOption={(
                              input,
                              option) => option.props.children.toLowerCase().
                              indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="FrontEnd">FrontEnd</Option>
                            <Option value="BackEnd">BackEnd</Option>
                            <Option value="Analista">Analista de
                              Sistemas</Option>
                            <Option value="Design UX">Diseñador UX</Option>
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
                                         'cantidad')}/>

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
                      <Table size="small" dataSource={dataSource}
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