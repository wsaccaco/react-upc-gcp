import React, {Component} from 'react';
import {Button, Col, Row, Steps, Card, List} from 'antd';
import {Link} from 'react-router-dom';

import Risk from '../../components/Risk/Risk';
import Planning from '../../components/Planning/Planning';
import DetailsFlow from '../../components/DetailsFlow/DetailsFlow';
import FlowRequirement from '../../components/FlowRequirement/FlowRequirement';
import FlowTechnical from '../../components/FlowTechnical/FlowTechnical';

import './Flow.css';
import http from '../../service/http';
import {message} from 'antd/lib/index';
import FlowCommittee from '../../components/FlowCommittee/FlowCommittee';

const Step = Steps.Step;


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

  makeLink(number){
    return <a href="javascript:void(false)" onClick={this.changeStep.bind(this, [number])}>Evaluación</a>
  }
  steps = [
    {
      title: 'Requerimientos',
      description: this.makeLink(0, 'Registro'),
    },
    {
      title: 'Técnica',
      description: this.makeLink(1, 'Evaluación')
    }, {
      title: 'Riesgo',
      description: this.makeLink(2, 'Evaluación')
    }, {
      title: 'Comité',
      description: this.makeLink(3, 'Evaluación')
    }, {
      title: 'Planificación',
      description: this.makeLink(4, 'Estrategía'),
    }, {
      title: 'Informe',
      description: this.makeLink(5, 'Final'),
    }];

  state = {
    current: 0,
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
    planning: <Planning rfc_id={this.props.match.params.id}/>,
    committee: <FlowCommittee />,
    report: <div>3</div>,
  };

  changeStep( step ){
    this.setState({
      current: +step
    })
  }

  fetchDetails() {
    let {id: rfc_Codigo} = this.props.match.params;
    this.setState({
      loading: true,
    });
    try {
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
        }, (e) => {
          message.error("Ups, vuelva a intentarlo nuevamente")
        });
    }catch (e) {

    }

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
                      {this.steps.map(
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
