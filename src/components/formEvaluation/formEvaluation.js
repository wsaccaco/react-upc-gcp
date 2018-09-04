import React, {Component} from 'react';
import CardEvaluation from './CardEvaluationRequirement'
import {
  Modal, message
} from 'antd';
import http from '../../service/http';


export default class formEvaluation extends Component {

  constructor(props) {
    super(props);
    let {visible} = props;
    this.state = {
      visible,
      Requirement: []
    }
  }

  static getDerivedStateFromProps({visible}, nextState){
    return {
      visible
    }
  }

  fetchEvaluarRequerimientos(){
    let {rfc_id} = this.props;
    http(`EvaluarRequerimientos/${rfc_id}`, 'GET', {}, (Requirement = []) => {

      this.setState({
        Requirement
      })

    }, (e) => {
      console.error(e);
    });
  }

  componentDidMount(){
    this.fetchEvaluarRequerimientos()
  }

  render() {

    let {visible, Requirement} = this.state;
    let {onClose} = this.props;

    return (
      <Modal
        title="Evaluar Requerimiento"
        visible={visible}
        onCancel={onClose}
        width="750px"
        footer={null}
      >
        {
          Requirement.length > 0
            ? Requirement.map((data, index) => <CardEvaluation key={index} data={data} />)
            : <div>Loading..</div>
        }

      </Modal>
    );
  };
}
