import React, {Component} from 'react';
import {
  Form,
  Select,
  Button,
  Switch,
  Icon,
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
        console.log('submit');
        // let pathName = this.isNew ? 'C0001S0003' : 'C0001S0004';

        this.http('C0001S0003', 'POST', form, (response) => {
          if (response === 'OK') {
            onOk(response);
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

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') &&
      getFieldError('userName');

    return (
      <LeaderTechnical.Consumer>
        {leaders => {


  console.log(leaders)
          return (
            <Form onSubmit={this.handleSubmit} layout="inline">

              <FormItem
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
              >
                {getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!',
                    }],
                })(
                  <Select
                    showSearch={true}
                    style={{width: '200px'}}
                    placeholder="Lider Tecnicos"
                    disabled={!disabled}
                  >
                    {leaders.map(({per_Nombre, per_Email}, index) => <Option key={index} value={per_Email}>{`${per_Nombre} < ${per_Email} >`}</Option>)}
                  </Select>,
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