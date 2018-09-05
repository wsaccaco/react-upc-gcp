import React, {Component} from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Icon,
  Popconfirm,
  Radio,
  Select,
  Table,
  Row,
  Col,
  Modal,
  Divider,
} from 'antd';

import './Planning.css';
import '../NewRequirementList/NewRequirementList.css';

import FormResource from '../PlanningFormDetail/PlanningFormResource';

import http from '../../service/http';
import http02 from '../../service/http02';

let FormItem = Form.Item;
let TextArea = Input.TextArea;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 12},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
  },
};
const dateFormat = 'YYYY-MM-DD';

class Planning extends Component {
  columns_requirement = [
    {
      title: 'Id',
      dataIndex: 'lir_Codigo',
      key: 'lir_Codigo',
    }, {
      title: 'Requerimiento',
      dataIndex: 'lir_Nombre',
    }, {
      title: 'Esfuerzo',
      dataIndex: 'lir_Esfuerzo',
      render(text, record) {
        return `${text} hrs`;
      },
    }, {
      title: 'Inicio',
      dataIndex: 'lir_Desde',
    }, {
      title: 'Entrega',
      dataIndex: 'lir_Hasta',
    }, {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (data, record) => (
        <span>
                <a href="javascript:;" onClick={() => {
                  this.openDetailRequirement(data);
                }}> <Icon type="edit" theme="outlined" /> Planing </a>
            </span>
      ),
    }];

  columns_rrhh = [
      {
          title: 'id',
          dataIndex: 'rrhh_Codigo',
          key: 'rrhh_Codigo',
      },{
          title: 'Identificador',
          dataIndex: 'rrhh_Identificador',
      }, {
          title: 'Perfil',
          dataIndex: 'tip_Nombre',
      }, {
          title: 'Cantidad',
          dataIndex: 'rrhh_Cantidad',
      }, {
          title: 'Nivel',
          dataIndex: 'niv_Nivel',
      }, {
          title: 'Desde',
          dataIndex: 'rrhh_FecInicio',
      }, {
          title: 'Hasta',
          dataIndex: 'rrhh_FechaTermino',
      }, {
          title: 'Presupuesto',
          dataIndex: 'rrhh_Presupuesto',
      }, {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 150,
          render: (text, record) => (
              <span>
            <a href="javascript:;" onClick={() => {
            }}> Editar </a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={() => {
            }}> Quitar </a>
        </span>
          ),
      }];

  columns_requirement_add = [
      {
          title: 'id',
          dataIndex: 'rad_Codigo',
          key: 'rad_Codigo',
      },{
      title: 'Recurso',
      dataIndex: 'rad_Identificador',
    }, {
      title: 'Cantidad',
      dataIndex: 'rad_Cantidad',
    }, {
      title: 'Desde',
      dataIndex: 'rad_FecInicio',
    }, {
      title: 'Hasta',
      dataIndex: 'rad_FechaTermino',
    }, {
      title: 'Presupuesto',
          dataIndex:'rad_Presupuesto',
    }, {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (text, record) => (
        <span>
            <a href="javascript:;" onClick={() => {}}> Editar </a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={() => {}}> Quitar </a>
        </span>
      ),
    }];

  constructor(props) {
    super(props);
    this.openDetailRequirement = this.openDetailRequirement.bind(this);
    this.closeDetailRequirement = this.closeDetailRequirement.bind(this);
    this.openRRHH = this.openRRHH.bind(this);
    this.closeRRHH = this.closeRRHH.bind(this);
    this.openResource = this.openResource.bind(this);
    this.closeResource = this.closeResource.bind(this);
    this.titleRRHHTable = this.titleRRHHTable.bind(this);
    this.titleRequirementTable = this.titleRequirementTable.bind(this);
    this.titleAgreementTable = this.titleAgreementTable.bind(this);
  }

  state = {
      dataSourceChange: [],
      dataSourceRRHH: [],
      dataSourceResourceAdd: [],
      loadingChange: true,
      visible: false,
      visibleRRHH: false,
      visibleResource: false,
      FormRequirementDetail: null,
      FormRRHH: null
  };

  openDetailRequirement(data) {

    import('../PlanningFormDetail/PlanningFormDetail').then(
      FormRequirementDetail => {
        this.setState({
          FormRequirementDetail: FormRequirementDetail.default,
          visible: true,
          data
        });
      });
  }

  closeDetailRequirement() {
    this.setState({
      visible: false,
    });
  }

  openRRHH() {
      import('../PlanningFormDetail/PlanningFormRRHH').then(
          FormRRHH => {
              this.setState({
                  FormRRHH: FormRRHH.default,
                  visibleRRHH: true
              });
          });
  }

  closeRRHH() {
    this.setState({
      visibleRRHH: false,
    });
  }

  openResource() {
    this.setState({
      visibleResource: true,
    });
  }

  closeResource() {
    this.setState({
      visibleResource: false,
    });
  }

  titleRRHHTable() {
    return (
      <div className="title-table">
        <strong> RRHH Necesarios </strong>
        <Button type="primary" onClick={() => {
          this.openRRHH();
        }}>Agregar</Button>
      </div>
    );
  }

  titleRequirementTable() {
    return (
      <div className="title-table">
        <strong> Recursos adicionales necesarios </strong>
        <Button type="primary" onClick={() => {
          this.openResource();
        }}>Agregar</Button>
      </div>
    );
  }

  titleAgreementTable() {
    return (
      <div className="title-table">
        <strong> Actas de acuerdos realizados </strong>
        <Button type="primary" onClick={() => {
          this.openDetailRequirement();
        }}>Agregar</Button>
      </div>
    );
  }

  //Cambios de Requerimientos
    fetchRequerimentsChanged() {
        const {rfc_id} = this.props;
        this.setState({
            loadingChange: true,
        });

        http('/PlanificarRequerimientos/' + rfc_id, 'GET', {}, (response) => {
            this.setState({
                dataSourceChange: response,
                loadingChange: false,
            });
        }, (e) => {
            console.error(e);
        });
    }

    fetchRRHH() {
        const {rfc_id} = this.props;
        this.setState({
            loadingChange: true,
        });

        http02('/rrhh/' + rfc_id, 'GET', {}, (response) => {
            this.setState({
                dataSourceRRHH: response,
                loadingChange: false,
            });
        }, (e) => {
            console.error(e);
        });
    }

    fetchResourceAdd() {
        const {rfc_id} = this.props;
        this.setState({
            loadingChange: true,
        });

        http02('/RecursoAdicional/' + rfc_id, 'GET', {}, (response) => {
            this.setState({
                dataSourceResourceAdd: response,
                loadingChange: false,
            });
        }, (e) => {
            console.error(e);
        });
    }

    componentDidMount() {
    //Cambios de Requerimientos
    this.fetchRequerimentsChanged();
    this.fetchRRHH();
    this.fetchResourceAdd();
  }

    onOk(){
        this.closeDetailRequirement();
        this.fetchRequerimentsChanged();
    }

    onOkRRHH(){
        this.closeRRHH();
        this.fetchRRHH();
    }

    render() {
    let {form, rfc_id} = this.props;
    let {visible, visibleRRHH, visibleResource, data, loading, FormRequirementDetail, FormRRHH} = this.state;
    let {
        dataSourceChange,
        dataSourceRRHH,
        dataSourceResourceAdd,
        loadingChange,
    } = this.state;

    const {getFieldDecorator} = form;

    return (
      <Form onSubmit={this.handleSubmit} className="gcp-form">
        <div>
          <Row gutter={16}>
            <Col>
              {getFieldDecorator('rfc_Codigo', {
                rules: [{required: true, message: 'Definir el RFC'}],
                initialValue: rfc_id,
              })(
                <Input type="hidden"/>,
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <FormItem>
                <div className="new-requirement-list component">
                  <div className="wrap-table">
                    <Table
                      title={() => 'Lista de requerimientos desglosados e la RFC'}
                      bordered
                      locale={{emptyText: 'No hay datos'}}
                      size="small"
                      scroll={{x: 1300}}
                      loading={loadingChange}
                      dataSource={dataSourceChange}
                      columns={this.columns_requirement}/>

                    {FormRequirementDetail && visible
                      ? <FormRequirementDetail
                        visible={visible}
                        onOk={this.onOk.bind(this)}
                        data={data}
                        onCancel={this.closeDetailRequirement}/>
                      : null}

                  </div>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <FormItem>
                <div className="new-requirement-list component">
                  <div className="wrap-table">
                    <Table
                      title={this.titleRRHHTable}
                      bordered
                      locale={{emptyText: 'No hay datos'}}
                      size="small"
                      scroll={{x: 1300}}
                      loading={loadingChange}
                      dataSource={dataSourceRRHH}
                      columns={this.columns_rrhh}/>

                      {FormRRHH && visibleRRHH
                          ? <FormRRHH
                              visible={visibleRRHH}
                              onOk={this.onOkRRHH.bind(this)}
                              rfc_Codigo={rfc_id}
                              onCancel={this.closeRRHH}/>
                          : null}
                  </div>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <FormItem>
                <div className="new-requirement-list component">
                  <div className="wrap-table">
                    <Table
                      title={this.titleRequirementTable}
                      bordered
                      locale={{emptyText: 'No hay datos'}}
                      size="small"
                      scroll={{x: 1300}}
                      loading={loadingChange}
                      dataSource={dataSourceResourceAdd}
                      columns={this.columns_requirement_add}/>
                    <FormResource visible={visibleResource} onOk={this.onOk}
                                  onCancel={this.closeResource}/>
                  </div>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <FormItem label={'Consideraciones adicionales:'}>
                <TextArea rows={5}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              Afectación a la línea base del proyecto
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <FormItem label={'Termino:'} {...formItemLayout} >
                <DatePicker
                  disabled={true}
                  format={dateFormat}/>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={'Tiempo adicional(dias):'} {...formItemLayout}>
                <Input/>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={'Nuevo termino:'} {...formItemLayout} >
                <DatePicker
                  disabled={true}
                  format={dateFormat}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <FormItem label={'Costo (S/):'} {...formItemLayout}>
                <Input disabled={true}/>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={'Costos adicionales (S/):'} {...formItemLayout}>
                <Input/>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={'Nuevo Costo (S/):'} {...formItemLayout}>
                <Input disabled={true}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Button type="primary">Guardar</Button>
          </Row>
        </div>
      </Form>
    );
  }
}

export default Form.create()(Planning);