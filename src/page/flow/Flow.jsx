import React, {Component} from 'react';
import {Button, Col, Row, Steps, Card, List} from 'antd';
import {Link} from 'react-router-dom';

import Risk from '../../components/Risk/Risk';
import DetailsFlow from '../../components/DetailsFlow/DetailsFlow';
import FlowRequirement from '../../components/FlowRequirement/FlowRequirement';
import FlowTechnical from '../../components/FlowTechnical/FlowTechnical';

import './Flow.css';
import http from '../../service/http';

const Step = Steps.Step;

const steps = [
  {
    title: 'Requerimientos',
    description: 'Registro',
  },
  {
    title: 'Técnica',
    description: 'Evaluación',
  }, {
    title: 'Riesgo',
    description: 'Evaluación',
  }, {
    title: 'Comité',
    description: <Link to="/">Evaluación</Link>,
  }, {
    title: 'Planificación',
    description: 'Estrategía',
  }, {
    title: 'Informe',
    description: 'Final',
  }];

const stepsNames = [
  'requirement',
  'technique',
  'risk',
  'committee',
  'planning',
  'report'
];

const {Meta} = Card;

export default class FlowPage extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    current: 2,
    loading: false,
    dataSource: {
      por_Nombre: null,
      per_Email: null,
      pro_Nombre: null,
      per_Nombre: null,
      rfc_Asunto: '',
    },
    requirement: <FlowRequirement rfc_id={this.props.match.params.id}/>,
    technique: <FlowTechnical rfc_id={this.props.match.params.id}/>,
    risk: <Risk rfc_id={this.props.match.params.id}/>,
    planning: <Risk/>,
    committee: <div>2</div>,
    report: <div>3</div>,
  };

  fetchDetails() {
    let {id: rfc_Codigo} = this.props.match.params;
    this.setState({
      loading: true,
    });
    http('C0001G0002', 'POST', {rfc_Codigo},
        ({por_Nombre, per_Email, pro_Nombre, per_Nombre, rfc_Asunto, LST_REQU, ...props}) => {
          this.setState({
            dataSource: {
              por_Nombre,
              per_Email,
              pro_Nombre,
              per_Nombre,
              rfc_Asunto,
            },
            requirement: <FlowRequirement requirements={LST_REQU}  />,
            loading: false,
          });
        }, () => {

        });
  }

  componentDidMount() {
    this.fetchDetails();
  }

  render() {
    let {current, loading, dataSource} = this.state;

    return (
        <div className="flow-page page">

          <Row className="gutter-row" gutter={16}>
            <Col span={24}>
              <DetailsFlow loading={loading} dataSource={dataSource}/>
            </Col>
          </Row>

          <Row className="gutter-row" gutter={16}>
            <Col span={24}>
              <Card
                  title={
                    <Steps size="small" current={current}>
                      {steps.map(
                          item => <Step key={item.title} title={item.title}
                                        description={item.description}/>)}
                    </Steps>
                  }>
                <div className="steps-content">{this.state[stepsNames[current]]}</div>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }

}
