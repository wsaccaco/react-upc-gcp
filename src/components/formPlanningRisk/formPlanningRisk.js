import React, {Component} from 'react';
import {
    Modal,
    Form,
    Input,
    Select,
    Row,
    Col,
    Card,
    Table,
} from 'antd';

import http from '../../service/http';
import './formPlanningRisk.css';

let FormItem = Form.Item;
let Option = Select.Option;
let TextArea = Input.TextArea;

//Cambios de Requerimientos
const _column_template = [{
    title: 'Código',
    dataIndex: 'lir_Codigo',
    key: 'lir_Codigo',
}, {
    title: 'Requerimiento',
    dataIndex: 'lir_Nombre',
    key: 'lir_Nombre',
}, {
    title: 'Prioridad',
    dataIndex: 'lir_Prioridad',
    key: 'lir_Prioridad',
}, {
    title: 'Estado',
    dataIndex: 'est_Estado',
    key: 'est_Estado',
}, {
    title: 'Fecha',
    dataIndex: 'lir_Fecha',
    key: 'lir_Fecha',
}];
let columns_requirement_change = [..._column_template];

class FormPlanningRisk extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        rfc_Codigo: this.props.rfc_Codigo,

        dataSourceChange: [],
        loadingChange: true,
    };

    //Cambios de Requerimientos
    fetchRequerimentsChanged() {
        const {rfc_Codigo} = this.props;
        this.setState({
            loadingChange: true
        });
        http('/rfc/' + rfc_Codigo + '/nuevosRequerimientos', 'GET', {}, (response) => {
            this.setState({
                dataSourceChange: response,
                loadingChange: false
            })
        }, (e) => {
            console.error(e)
        } );
    }
    titleTable() {
        return (
            <div className="title-table">
                <strong> Cambios de Requerimientos </strong>
            </div>
        );
    }

    componentDidMount() {
        //Cambios de Requerimientos
        this.fetchRequerimentsChanged()
    }

    render() {
        let {visible, onOk, onCancel, form} = this.props;
        let {
            dataSourceChange,
            loadingChange
        } = this.state;

        return(
            <Modal
                title={"Evaluación de Riesgo"}
                visible={visible}
                onOk={this.onCreate}
                okText="Guardar"
                onCancel={onCancel}
                // okButtonProps={{disabled: hasErrors(getFieldsError())}}
            >
                <Form layout="vertical" onSubmit={this.handleSubmit} className="gcp-form">
                    {/*Cambios de Requerimientos*/}
                    <Row>
                        <Col span={24}>
                            <Card title="Cambios de Requerimientos">
                                <Table
                                    bordered
                                    locale={{emptyText: 'No hay datos'}}
                                    size="small"
                                    scroll={{x: 800}}
                                    loading={loadingChange}
                                    dataSource={dataSourceChange}
                                    columns={columns_requirement_change} />
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(FormPlanningRisk);