import React, {Component} from 'react';
import {Form, Icon, Col, Button, Row, Input, DatePicker, TimePicker, Tag, Select} from 'antd';
import {Link} from 'react-router-dom';
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
              <FormItem label={`F. Reunión :`} {...formItemLayout} >
                {getFieldDecorator(`meeting`, {
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
                {getFieldDecorator(`Hour`, {
                  rules: [{
                    required: true,
                    message: 'Ingresa una Hora',
                  }],
                })(
                  <TimePicker />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`Lugar`} {...formItemLayout}>
                {getFieldDecorator(`place`, {
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
                {getFieldDecorator(`description`, {
                  rules: [{
                    required: true
                  }],
                })(
                  <Input style={{width: '100%'}}/>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={`Participantes`} {...formItemLayout}>
                {getFieldDecorator(`participants`, {
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
              <Button type="primary" htmlType="submit">Enviar y Agendar</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

}

export default Form.create()(FlowCommittee);