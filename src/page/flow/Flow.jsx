import React, {Component} from 'react';
import {Button, Col, Row, Steps, Card} from 'antd';
import {Link} from 'react-router-dom';

import Risk from '../../components/Risk/Risk'

import './Flow.css';
import http from '../../service/http';
const Step = Steps.Step;

const steps = [{
  title: 'Técnica',
  description: 'Evaluación',
  content: <div>1</div>
}, {
  title: 'Riesgo',
  description: 'Evaluación',
  content: <Risk />
}, {
  title: 'Comité',
  description: <Link to="/">Evaluación</Link>,
  content: <div>1</div>
}, {
  title: 'Planificación',
  description: 'Estrategía',
  content: <div>1</div>
}, {
  title: 'Informe',
  description: 'Final',
  content: <div>1</div>
}];

const { Meta } = Card;

export default class FlowPage extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    current: 0,
  };

  componentDidMount() {

  }


  render() {
    let {current} = this.state;
    return (
        <div className="flow-page page">
          <Row className="gutter-row" gutter={16}>
            <Col span={24}>
              <Card
                  title="Prueba">
                <Row gutter={16}>
                  <Col span={12}>a</Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row className="gutter-row" gutter={16}>
            <Col span={24}>
              <Card
                  title={
                    <Steps size="small" current={current}>
                      {steps.map(item => <Step key={item.title} title={item.title} description={item.description} />)}
                    </Steps>
                  }>
                <div className="steps-content">{steps[current].content}</div>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }

}
