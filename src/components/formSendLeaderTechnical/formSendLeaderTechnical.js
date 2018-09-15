import React, {Component} from 'react';
import {
    Form,
    Select,
    Button, Input, message
} from 'antd';
import {LeaderTechnical} from '../../context/LeaderTechnical';
import './formSendLeaderTechnical.css';

let FormItem = Form.Item;
const Option = Select.Option;

class FormSendLeaderTechnical extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: props.disabled,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let {form, onOk} = this.props;

    form.validateFields((err, form) => {
      if (!err) {
        console.log('Received values of form: ', form);

        this.http('RequerimientoTecnico/update', 'POST', form, (response) => {
            let {sucess} = response;
            if (sucess === true) {
                message.success('Se envio la información al Lider Tecnico.');
            } else {
                message.warning('Ocurrió un error en el envió.');
            }
        });
      }
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let {disabled} = nextProps;
    return {
      disabled,
    };
  }

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    let {disabled} = this.state;
    let {lir_Codigo, lit_Codigo} = this.props;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');

    return (
      <LeaderTechnical.Consumer>
        {leaders => {
          return (
            <Form onSubmit={this.handleSubmit} layout="inline">
                <FormItem>
                    {getFieldDecorator('lir_Codigo', {
                        rules: [{required: true, message: 'Definir ID'}],
                        initialValue: lir_Codigo
                    })(
                        <Input type="hidden"/>
                    )}
                </FormItem>

                <FormItem
                  validateStatus={userNameError ? 'error' : ''}
                  help={userNameError || ''}
                >
                  {getFieldDecorator('lit_Codigo', {
                      rules: [{required: true,message: 'Seleccione Lider Tecnico',}],
                      initialValue: lit_Codigo
                  })(
                    <Select
                      showSearch={true}
                      style={{width: '200px'}}
                      placeholder="Lider Tecnico"
                      disabled={!disabled}
                    >
                      {
                        leaders.map(
                            ({lit_Codigo, per_Nombre, per_Email}, index) =>
                                <Option key={index} value={lit_Codigo}>{`${per_Nombre} < ${per_Email} >`}</Option>
                        )
                      }
                    </Select>
                  )}
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    icon="mail"
                    htmlType="submit"
                    disabled={!disabled}
                  >
                    Enviar
                  </Button>
                </FormItem>
            </Form>
          );
        }}
      </LeaderTechnical.Consumer>

    );
  };
}

export default Form.create()(FormSendLeaderTechnical);