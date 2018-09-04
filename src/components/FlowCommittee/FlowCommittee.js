import React, {Component} from 'react';
import {Button, Col, Row, Table, Card, Tag} from 'antd';
import FormSchedule from './FormSchedule';
import {RfcContext} from '../../context/RFC';
import http from '../../service/http';

import './FlowCommittee.css';



const columns = [
  {
    title: 'Fecha',
    dataIndex: 'reu_FechaReunion',
    key: 'date',
  },
  {
    title: 'Hora',
    dataIndex: 'reu_HoraReunion',
    key: 'time',
  },
  {
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
    dataIndex: 'ReunionParticipante',
    render: tags => (
      <span>
      {tags.map(
        ({per_Email}) => <Tag color="blue" key={per_Email}>{per_Email.split(
          '@')[0]}</Tag>)}
    </span>
    ),
  }];

export default class FlowCommittee extends Component {

  state = {
    visibleEvaluation: false,
    rfc_id: this.props.rfc_id,
    dataSource: [],
    FormEvaluation: null
  };

  componentDidMount() {
    this.fetchSchedule();
  }

  fetchSchedule() {
    let {rfc_id} = this.props;

    this.setState({
      loading: true,
    });

    http(`Reunion/${rfc_id}`, 'GET', {}, (response) => {
      this.setState({
        dataSource: response,
        loading: false,
      });
    }, (e) => {
      console.error(e);
    });
  }

  _openEvaluation = () => {

    import('../../components/formEvaluation/formEvaluation').then(FormEvaluation => {
      this.setState({ FormEvaluation: FormEvaluation.default });
    });

    this.setState({
      visibleEvaluation: true,
    });
  };

  _closeEvaluation = () => {
    this.setState({
      visibleEvaluation: false,
    });
  };

  _refresh = () => {
    this.fetchSchedule();
  };

  render() {
    let {visibleEvaluation, dataSource, loading, FormEvaluation} = this.state;
    let {rfc_id} = this.props;
    return (
      <RfcContext.Provider value={rfc_id}>
        <div className="flow-committee component">
          <Card title="Programar Reunión" type="inner">

            <FormSchedule refresh={this._refresh}/>

            <div style={{padding: '15px 0'}}>
              <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                footer={() => (
                  <Row justify="end" type="flex">
                    <Col>
                      <Button type="primary" icon="schedule"
                              disabled={!(dataSource.length > 0)}
                              onClick={this._openEvaluation}>Evaluar</Button>
                    </Col>
                  </Row>)
                }/>
            </div>
          </Card>
          {FormEvaluation
            ? <FormEvaluation rfc_id={rfc_id}
                              visible={visibleEvaluation}
                              onClose={this._closeEvaluation} />
            : null }
        </div>
      </RfcContext.Provider>
    );
  }

}