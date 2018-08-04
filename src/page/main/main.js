import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './main.css';

export default class Main extends Component {

  constructor(props){
    super(props);
    let url = '';
    this.state = {
      modules : [
      {
        urlImage: url,
        title: 'Gestión de Portafolio',
        rfc_Asunto: 'Es el modulo qye permite la gestion eficaz del prortafolio de proyectos mediante monitoreo',
        link : ''
      },
      {
        urlImage: url,
        title: 'Gestión de cambios en proyectos TI',
        rfc_Asunto: 'Es el módulo que permite reducir el tiempo y riesgos tecnicos asi como economicos al momento de la realizacion de  los cambios en la empresa',
        link : 'cambios'
      }, {
        urlImage: url,
        title: 'Gestion de Requerimientos',
        rfc_Asunto: 'Es el módulo  que permite realizar la planificación estrategica asi como implementar todas las actividades y funciones que involucra este proceso.',
        link : ''
      }, {
        urlImage: url,
        title: 'Services Desk',
        rfc_Asunto: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        link : ''
      }
    ]
    }
  }

  cards(){
    let {modules} = this.state;
    return modules.map((module, index) => {
      return (<Col span={6} key={index}>
        <strong>{module.title}</strong>
        <span>{module.rfc_Asunto}</span>
      </Col>)
    })
  }

  componentDidMount(){

  }

  render() {
    return (
        <div className="Main">
          <Row>
            <Col span={12}>col-12</Col>
            <Col span={12}>col-12</Col>
          </Row>
          <Row>
            {this.cards()}
          </Row>
        </div>
    );
  }

}
