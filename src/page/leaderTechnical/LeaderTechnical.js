import React, { Component } from 'react';
import {Card, Form, Input, Radio} from 'antd';
import './LeaderTechnical.css'

let FormItem = Form.Item;
let RadioGroup = Radio.Group;


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



class LeaderTechnical extends Component {

    state = {
        evr_Requiere: 0,

        evaluacionriesgoDisabled: false

    }



  render() {
        let { form, rfc_id} = this.props;

          let {
              evr_Requiere,

              evaluacionriesgoDisabled
              } = this.state;

        const {getFieldDecorator} = form;
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
            </Form>
        );
  }
}

export default  Form.create()(LeaderTechnical);