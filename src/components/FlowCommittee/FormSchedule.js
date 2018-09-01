import React, {Component} from 'react';
import {Form, Icon, Col, Button, Row, Input, DatePicker, TimePicker, Tag, Select} from 'antd';
import {RfcContext} from '../../context/RFC'
import './FlowCommittee.css';

import http from '../../service/http';

const FormItem = Form.Item;
let Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class FlowCommittee extends Component {

  state = {
    loadingParticipant: true
  };

  componentDidMount() {
    this.fetchParticipant();
  }

  fetchParticipant() {

    http(`Participante`, 'GET', {}, (response = []) => {

      let OptionPortafalio = response.map(({text, value, per_Email, per_Nombre}, index) => {
        return <Option key={index} text={text} email={per_Email} value={value.toString()}>{text}</Option>;
      });

      this.setState({
        ParticipantSource: OptionPortafalio,
        loadingParticipant: false,
      });
    }, (e) => {
      console.error(e);
    });
  }

  fetchPostSchedule(values){
    http(`Reunion`, 'POST', values, ({success}) => {

      if(success){
        this.props.refresh();
      }

    }, (e) => {
      console.error(e);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, {reu_FechaReunion, reu_HoraReunion, ReunionParticipante, ...values}) => {
      if (!err) {
        values.reu_FechaReunion = reu_FechaReunion.format('YYYYMMDD');
        values.reu_HoraReunion = reu_FechaReunion.format('h:mm');
        values.ReunionParticipante = ReunionParticipante.map(({key}) => ({per_Codigo : +key}));
        this.fetchPostSchedule(values);
      }
    })
  };


  render() {

    const { getFieldDecorator } = this.props.form;
    const {ParticipantSource} = this.state;

    return (
      <div className="flow-committee component">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSubmit}
        >
          <Row gutter={16}>
            <Col span={8}>
              <RfcContext.Consumer>
                {
                  rfc_id => getFieldDecorator(`rfc_Codigo`, {
                    initialValue: rfc_id
                  })(
                    <Input type="hidden"/>
                  )
                }
              </RfcContext.Consumer>
              <FormItem label={`F. Reunión :`} {...formItemLayout} >
                {getFieldDecorator(`reu_FechaReunion`, {
                  rules: [{
                    required: true,
                    message: 'Ingresa una fecha',
                  }],
                })(
                  <DatePicker />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`Hora`} {...formItemLayout}>
                {getFieldDecorator(`reu_HoraReunion`, {
                  rules: [{
                    required: true,
                    message: 'Ingresa una Hora',
                  }],
                })(
                  <TimePicker placeholder={'hh:mm'} format={'HH:mm'} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`Lugar`} {...formItemLayout}>
                {getFieldDecorator(`reu_Lugar`, {
                  rules: [{
                    required: true,
                    message: 'Ingresa un lugar o ambiente'
                  }],
                })(
                  <Input placeholder="lugar de la reunión"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label={`Descripción`} {...formItemLayout} >
                {getFieldDecorator(`reu_Comentario`, {
                  rules: [],
                })(
                  <Input style={{width: '100%'}}/>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={`Participantes`} {...formItemLayout}>
                {getFieldDecorator(`ReunionParticipante`, {
                  rules: [{
                    required: true,
                    message: 'Ingresa a los participantes'
                  }],
                })(
                  <Select
                    style={{ width: '100%' }}
                    mode="multiple"
                    filterOption={true}
                    tokenSeparators={[',']}
                    placeholder="email's"
                    labelInValue
                    optionFilterProp="text"
                    optionLabelProp="email"
                  >
                    {ParticipantSource}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="default" htmlType="submit">Enviar y Agendar</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

}

export default Form.create()(FlowCommittee);