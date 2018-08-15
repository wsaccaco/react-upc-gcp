import React, {Component} from 'react';
import {Button, Col, Row, Steps, Card} from 'antd';
import {Link} from 'react-router-dom';

import './Risk.css';
import http from '../../service/http';

export default class Risk extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    content: 'Risk',
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        content : 'Montes Pendejo'
      })
    }, 2000)
  }


  render() {
    let {content} = this.state;
    return (
        <div className="Risk component">
          {content}
        </div>
    );
  }

}
