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
      visible
    }
  }

  static getDerivedStateFromProps({visible}, nextState){
    return {
      visible
    }
  }


  render() {

    let {visible} = this.state;
    let {onClose} = this.props;

    return (
      <Modal
        title="Title"
        visible={visible}
        onCancel={onClose}
        width="650px"
        footer={null}
      >
        <CardEvaluation />
      </Modal>
    );
  };
}
