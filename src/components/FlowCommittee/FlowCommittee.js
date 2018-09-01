import React, {Component} from 'react';
import {Icon, Button, Col, Row, Table, Card} from 'antd';
import {Link} from 'react-router-dom';
import FormSchedule from './FormSchedule'
import FormEvaluation from '../../components/formEvaluation/formEvaluation'
import {RfcContext} from '../../context/RFC'
import http from '../../service/http';

import './FlowCommittee.css';

// public int acci { get; set; }
// public int reu_Codigo { get; set; }
// public int rfc_Codigo { get; set; }
// public DateTime reu_FechaReunion { get; set; }
// public DateTime reu_HoraReunion { get; set; }
// public string reu_Lugar { get; set; }
// public string reu_Comentario { get; set; }

const columns = [{
  title: 'Fecha',
  dataIndex: 'reu_FechaReunion',
  key: 'name',
}, {
  title: 'Lugar',
  dataIndex: 'reu_Lugar',
  key: 'age',
}, {
  title: 'Asunto',
  dataIndex: 'reu_Comentario',
  key: 'address',
}, {
  title: 'Participantes',
  key: 'tags',
  dataIndex: 'tags',
}, {
  title: 'Estado',
  key: 'action'
}];

export default class FlowCommittee extends Component {

  state = {
    visibleEvaluation: false,
    rfc_id: this.props.rfc_id
  };

  componentDidMount() {
    this.fetchSchedule();
  }

  fetchSchedule() {
    let {rfc_id} = this.props;

    this.setState({
      loading: true
    });

    http(`Reunion/${rfc_id}`, 'GET', {}, (response) => {
      console.log(response)
      this.setState({
        dataSource: response,
        loading: false,
      });
    }, (e) => {
      console.error(e);
    });
  }

  _openEvaluation = () => {
    this.setState({
      visibleEvaluation : true
    })
  };

  _closeEvaluation = () => {
    this.setState({
      visibleEvaluation : false
    })
  };

  render() {
    let {visibleEvaluation, dataSource, loading} = this.state;
    let {rfc_id} = this.props;
    return (
      <div className="flow-committee component">
        <Card title="Programar Reunión" type="inner">
          <RfcContext.Provider value={rfc_id}>
            <FormSchedule />
          </RfcContext.Provider>
          <div style={{padding: '15px 0'}}>
            <Table
              columns={columns}
              dataSource={dataSource}
              loading={loading}
              footer={() => (
                <Row justify="end" type="flex">
                  <Col>
                    <Button type="primary" icon="schedule" onClick={this._openEvaluation}>Evaluar</Button>
                  </Col>
                </Row>)
              } />
          </div>
        </Card>
          <FormEvaluation visible={visibleEvaluation} onClose={this._closeEvaluation} />
      </div>
    );
  }

}