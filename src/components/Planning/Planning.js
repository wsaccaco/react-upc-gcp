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
import '../PlanningFormDetail/PlanningFormBaseLine';

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
          key: 'rrhh_Identificador',
      }, {
          title: 'Perfil',
          dataIndex: 'tip_Nombre',
          key: 'tip_Nombre',
      }, {
          title: 'Cantidad',
          dataIndex: 'rrhh_Cantidad',
          key: 'rrhh_Cantidad',
      }, {
          title: 'Nivel',
          dataIndex: 'niv_Nivel',
          key: 'niv_Nivel',
      }, {
          title: 'Desde',
          dataIndex: 'rrhh_FecInicio',
          key: 'rrhh_FecInicio',
      }, {
          title: 'Hasta',
          dataIndex: 'rrhh_FechaTermino',
          key: 'rrhh_FechaTermino',
      }, {
          title: 'Presupuesto',
          dataIndex: 'rrhh_Presupuesto',
          key: 'rrhh_Presupuesto',
      }, {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 150,
          render: (data, record) => (
              <span>
                <a href="javascript:;" onClick={() => {this.openEditingRRHH(data);}}><Icon type="edit" theme="outlined"/> Editar </a>
                <Divider type="vertical"/>
                <a href="javascript:;" onClick={() => {this.deleteRRHH(data);}}> Quitar </a>
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
      render: (data, record) => (
        <span>
            <a href="javascript:;" onClick={() => {this.openEditingResource(data);}}><Icon type="edit" theme="outlined"/> Editar </a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={() => {this.deleteResource(data);}}> Quitar </a>
        </span>
      ),
    }];

  constructor(props) {
      super(props);
      this.openDetailRequirement = this.openDetailRequirement.bind(this);
      this.closeDetailRequirement = this.closeDetailRequirement.bind(this);
      this.openRRHH = this.openRRHH.bind(this);
      this.closeRRHH = this.closeRRHH.bind(this);
      this.openEditingRRHH = this.openEditingRRHH.bind(this);
      this.closeEditingRRHH = this.closeEditingRRHH.bind(this);
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
      visibleEditingRRHH: false,
      FormRequirementDetail: null,
      FormRRHH: null,
      FormResource: null,
      FormEditingRRHH: null,
      dataRRHH: null,
      updateRRHH:false,
      dataResource: null,
      updateResource:false,
      FormBaseLine:null
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

    deleteRRHH (data) {
        this.setState({
            loadingChange: true,
        });

        http('rrhh/delete', 'POST', data, (response) => {
            if (response) {
                this.fetchRRHH();
            }
            loadingChange: false
        });
    };

    deleteResource (data) {
        this.setState({
            loadingChange: true,
        });

        http('RecursoAdicional/delete', 'POST', data, (response) => {
            if (response) {
                this.fetchResourceAdd();
            }
            loadingChange: false
        });
    };

    openRRHH() {
        import('../PlanningFormDetail/PlanningFormRRHH').then(
            FormRRHH => {
                this.setState({
                    FormRRHH: FormRRHH.default,
                    visibleRRHH: true,
                    dataRRHH: null,
                    updateRRHH:false
                });
            });
    }

    closeRRHH() {
        this.setState({
            visibleRRHH: false,
        });
    }

    openEditingRRHH(dataRRHH) {
        import('../PlanningFormDetail/PlanningFormRRHH').then(
            FormRRHH => {
                this.setState({
                    FormRRHH: FormRRHH.default,
                    visibleRRHH: true,
                    updateRRHH:true,
                    dataRRHH
                });
            });
    }

    closeEditingRRHH() {
        this.setState({
            visibleEditingRRHH: false,
        });
    }

    openResource() {
        import('../PlanningFormDetail/PlanningFormResource').then(
            FormResource => {
                this.setState({
                    FormResource: FormResource.default,
                    visibleResource: true,
                    dataResource: null,
                    updateResource:false
                });
            });
    }

    openEditingResource(dataResource) {
        import('../PlanningFormDetail/PlanningFormResource').then(
            FormResource => {
                this.setState({
                    FormResource: FormResource.default,
                    visibleResource: true,
                    updateResource:true,
                    dataResource
                });
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

        http('rrhh/' + rfc_id, 'GET', {}, (response) => {
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

        http('RecursoAdicional/' + rfc_id, 'GET', {}, (response) => {
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

    onOkResource(){
        this.closeResource();
        this.fetchResourceAdd();
    }

    render() {
    let {form, rfc_id} = this.props;
    let {
        visible, visibleRRHH, visibleResource, data, dataRRHH, FormRequirementDetail, FormRRHH,
        dataSourceChange, updateRRHH,updateResource,dataResource,FormResource,
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
                  </div>
                    {FormRRHH && visibleRRHH
                        ? <FormRRHH
                            visible={visibleRRHH}
                            onOk={this.onOkRRHH.bind(this)}
                            rfc_Codigo={rfc_id}
                            dataRRHH={dataRRHH}
                            dataUpdate={updateRRHH}
                            onCancel={this.closeRRHH}/>
                        : null}
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
                  </div>
                    {FormResource && visibleResource
                        ? <FormResource
                            visible={visibleResource}
                            onOk={this.onOkResource.bind(this)}
                            rfc_Codigo={rfc_id}
                            dataResource={dataResource}
                            dataUpdate={updateResource}
                            onCancel={this.closeResource}/>
                        : null}
                </div>
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default Form.create()(Planning);