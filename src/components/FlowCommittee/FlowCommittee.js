import React, {Component} from 'react';
import {Icon, Button, Col, Row, Table, Card} from 'antd';
import {Link} from 'react-router-dom';
import FormSchedule from './FormSchedule'
import FormEvaluation from '../../components/formEvaluation/formEvaluation'
import http from '../../service/http';

import './FlowCommittee.css';

const columns = [{
  title: 'Fecha',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Lugar',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Asunto',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Participantes',
  key: 'tags',
  dataIndex: 'tags',
}, {
  title: 'Estado',
  key: 'action'
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

export default class FlowCommittee extends Component {

  state = {
    visibleEvaluation: false
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
      // this.setState({
      //   dataSource: response,
      //   loading: false,
      // });
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
    let {visibleEvaluation} = this.state;
    console.log({visibleEvaluation})
    return (
      <div className="flow-committee component">
        <Card title="Programar Reunión" type="inner">
          <FormSchedule />
          <div style={{padding: '15px 0'}}>
            <Table
              columns={columns}
              dataSource={data}
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