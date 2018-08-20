import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, message, Popconfirm, Radio, Select} from 'antd';
import moment from 'moment';
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

const textEnviarRiesgo = 'Estas seguro de enviar la información a Evaluar en Riesgo?';
//const dateFormat = 'YYYY/MM/DD';
const dateFormat = 'DD/MM/YYYY';

class Risk extends Component {

    constructor(props) {
        super(props);
        this.fetchEstado = this.fetchEstado.bind(this);
        this.fetchImpacto = this.fetchImpacto.bind(this);
    }

    state = {
        evr_Requiere: 0,
        evr_FechaEnvio: '01/01/1900',
        evr_Estado: 0,
        evr_FechaRespuesta: '01/01/1900',
        evr_Informe: '',
        evr_Impacto: 0,

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
        //console.log('radio checked', e.target.value);
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
        http('RFC/EvaluacionRiesgo', 'POST', form, (response) => {
            if (response === 'OK') {
                message.success('Se envio la información a Evaluar en Riesgo.');
                let {evr_Requiere,
                    evr_FechaEnvio,
                    evr_Estado,
                    evr_FechaRespuesta,
                    evr_Informe,
                    evr_Impacto} = response;
                this.setState({
                    evr_Requiere,
                    evr_FechaEnvio,
                    evr_Estado,
                    evr_FechaRespuesta,
                    evr_Informe,
                    evr_Impacto
                });
            } else {
                message.warning('Ocurrio un error en el envio.');
            }
        });
    };

    fetchEstado(){
        http('RFC/EstadoRiesgo', 'GET', {}, (response) => {
            let OptionEstado = response.map(({esr_Descripcion:text, esr_Codigo:value}, index) => {
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
        http('RFC/ImpactoRiesgo', 'GET', {}, (response) => {
            let OptionImpacto = response.map(({imp_Descripcion:text, imp_Codigo:value}, index) => {
                return <Option key={index} value={value}>{text}</Option>;
            }, (err) => {
                console.log(err);
            });
            this.setState({
                OptionImpacto
            })
        });
    }

    fetchEvaluacionRiesgo(){
        let {rfc_id} = this.props;
        http('RFC/EvaluacionRiesgo', 'GET', {id:rfc_id}, (response) => {
            let {evr_Requiere,
                evr_FechaEnvio,
                evr_Estado,
                evr_FechaRespuesta,
                evr_Informe,
                evr_Impacto} = response;
            this.setState({
                evr_Requiere,
                evr_FechaEnvio,
                evr_Estado,
                evr_FechaRespuesta,
                evr_Informe,
                evr_Impacto
            });
        });
    }

    componentDidMount() {
        this.fetchEstado();
        this.fetchImpacto();
        this.fetchEvaluacionRiesgo();
    }

    render() {

        let {visible, onOk, onCancel, form, rfc_id} = this.props;
        let {
            evr_Requiere,
            evr_FechaEnvio,
            evr_Estado,
            evr_FechaRespuesta,
            evr_Informe,
            evr_Impacto,

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
                <FormItem>
                    {getFieldDecorator('rfc_Codigo', {
                        rules: [],
                        initialValue: rfc_id
                    })(
                        <Input type="hidden"/>
                    )}
                </FormItem>

                <FormItem
                    label={'Requiere evaluación'}
                    {...formItemLayout}
                    >
                    {getFieldDecorator('evr_Requiere', {
                        rules: [],
                        initialValue: evr_Requiere
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
                            disabled={enviarriesgoDisabled}>
                            Enviar a Riesgo
                        </Button>
                    </Popconfirm>
                </FormItem>

                <FormItem
                    label={'Estado'}
                    {...formItemLayout}
                    >
                    <Select
                        showSearch
                        disabled={estadoDisabled}
                        placeholder="Seleccione Estado"
                        defaultValue={evr_Estado}>
                        {OptionEstado}
                    </Select>
                </FormItem>

                <FormItem
                    label={'Fecha de Envio'}
                    {...formItemLayout}
                    >
                    <DatePicker
                        disabled={fenvioDisabled}
                        defaultValue={moment(evr_FechaEnvio, this.dateformat)}
                        format={dateFormat}
                    />
                </FormItem>

                <FormItem
                    label={'Fecha de Respuesta'}
                    {...formItemLayout}
                    >
                    <DatePicker
                        disabled={frespuestaDisabled}
                        defaultValue={moment(evr_FechaRespuesta, this.dateformat)}
                        format={dateFormat}
                    />
                </FormItem>

                <FormItem
                    label={'Informe'}
                    {...formItemLayout}
                    >
                    <TextArea
                        disabled={informeDisabled}
                        placeholder="Resumen de informe emitido por Gestión de Riesgo"
                        defaultValue={evr_Informe}
                    />
                </FormItem>

                <FormItem
                    label={'Impacto'}
                    {...formItemLayout}
                    >
                    <Select
                        showSearch
                        disabled={impactoDisabled}
                        placeholder="Seleccione Impacto"
                        defaultValue={evr_Impacto}>
                        {OptionImpacto}
                    </Select>
                </FormItem>

                <FormItem
                    label={'Adjunto'}
                    {...formItemLayout}
                    >
                    <Button
                        icon="download"
                        //onClick={}
                        disabled={downloadDisabled}>
                        Download
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default  Form.create()(Risk);