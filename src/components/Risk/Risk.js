import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, message, Popconfirm, Radio, Select} from 'antd';
import './Risk.css';
import http from '../../service/http';

let FormItem = Form.Item;
let RadioGroup = Radio.Group;
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

class Risk extends Component {

    constructor(props) {
        super(props);
        this.fetchEstado = this.fetchEstado.bind(this);
        this.fetchImpacto = this.fetchImpacto.bind(this);
    }

    state = {
        textEnviarRiesgo: 'Estas seguro de enviar la información a Evaluar en Riesgo?',
        valueRadioRisk: 1,
        evaluacionriesgoDisabled: false,
        enviarriesgoDisabled: true,
        OptionEstado: [],
        estadoDisabled: true,
        fenvioDisabled: true,
        frespuestaDisabled: true,
        informeDisabled: true,
        OptionImpacto: [],
        impactoDisabled: true,
        downloadDisabled: true
    };

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            valueRadioRisk: e.target.value
        });
        if (e.target.value == 0){
            this.setState({
                enviarriesgoDisabled: true
            });
        } else {
            this.setState({
                enviarriesgoDisabled: false
            });
        }
    }

    confirmEnviarRiesgo(e) {
        this.onClickEnviarRiesgo()
    }

    onClickEnviarRiesgo(){
        let {form} = this.props;

        //PopConfirm
        http('C0001S0003', 'POST', form, (response) => {
            if (response === 'OK') {
                message.success('Se envio la información a Evaluar en Riesgo.');
            } else {
                message.warning('Ocurrio un error en el envio.');
            }
        });
    };

    fetchEstado(){
        http('C0003G0001', 'GET', {}, (response) => {
            let OptionEstado = response.map(({text, value}, index) => {
                return <Option key={index} value={value}>{text}</Option>;
            }, (err) => {
                console.log(err);
            });
            this.setState({
                OptionEstado
            })
        });
    }

    fetchImpacto(){
        http('C0003G0001', 'GET', {}, (response) => {
            let OptionImpacto = response.map(({text, value}, index) => {
                return <Option key={index} value={value}>{text}</Option>;
            }, (err) => {
                console.log(err);
            });
            this.setState({
                OptionImpacto
            })
        });
    }

    componentDidMount() {
        this.fetchEstado();
        this.fetchImpacto();
        this.props.form.validateFields();
    }

    render() {
        let {visible, onOk, onCancel, form} = this.props;

        let {
            textEnviarRiesgo,
            valueRadioRisk,
            evaluacionriesgoDisabled,
            enviarriesgoDisabled,
            OptionEstado,
            estadoDisabled,
            fenvioDisabled,
            frespuestaDisabled,
            informeDisabled,
            OptionImpacto,
            impactoDisabled,
            downloadDisabled
        } = this.state;

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form;

        return (
            <Form className="gcp-form">
                <FormItem
                    label={'Requiere evaluación'}
                    {...formItemLayout}
                    >
                    {getFieldDecorator('rfc_EvaluacionRiesgo', {
                        rules: []
                    })(
                        <RadioGroup
                            onChange={this.onChange}
                            disabled={evaluacionriesgoDisabled}>
                            <Radio value={1}>SI</Radio>
                            <Radio value={0}>NO</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    label={' '}
                    {...formItemLayout}
                >
                    <Popconfirm placement="bottom" title={textEnviarRiesgo} onConfirm={this.confirmEnviarRiesgo} okText="Yes" cancelText="No">
                        <Button
                            type="primary"
                            icon="rocket"
                            //onClick={this.onClickEnviarRiesgo}
                            disabled={enviarriesgoDisabled}>
                            Enviar a Riesgo
                        </Button>
                    </Popconfirm>
                </FormItem>

                <FormItem
                    label={'Estado'}
                    {...formItemLayout}
                    >
                    {getFieldDecorator('rfc_Estado', {
                        rules: []
                    })(
                        <Select
                            showSearch
                            disabled={estadoDisabled}
                            placeholder="Seleccione Estado">
                            {OptionEstado}
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    label={'Fecha de Envio'}
                    {...formItemLayout}
                    >
                    {getFieldDecorator('rfc_FechaEnvio', {
                        rules: []
                    })(
                        <DatePicker
                            disabled={fenvioDisabled}
                        />
                    )}
                </FormItem>

                <FormItem
                    label={'Fecha de Respuesta'}
                    {...formItemLayout}
                    >
                    {getFieldDecorator('rfc_FechaRepuesta', {
                        rules: []
                    })(
                        <DatePicker
                            disabled={frespuestaDisabled}
                        />
                    )}
                </FormItem>

                <FormItem
                    label={'Informe'}
                    {...formItemLayout}
                    >
                    {getFieldDecorator('rfc_Informe', {
                        rules: [],
                    })(
                        <TextArea
                            disabled={informeDisabled}
                            placeholder="Resumen de informe emitido por Gestión de Riesgo"
                        />
                    )}
                </FormItem>

                <FormItem
                    label={'Impacto'}
                    {...formItemLayout}
                    >
                    {getFieldDecorator('rfc_Impacto', {
                        rules: []
                    })(
                        <Select
                            showSearch
                            disabled={impactoDisabled}
                            placeholder="Seleccione Impacto">
                            {OptionImpacto}
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    label={'Adjunto'}
                    {...formItemLayout}
                >
                    <Button
                        icon="download"
                        //onChange={}
                        disabled={downloadDisabled}>
                        Download
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default  Form.create()(Risk);