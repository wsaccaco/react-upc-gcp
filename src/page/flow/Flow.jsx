import React, {Component} from 'react';
import {Button, Table, Icon, Divider} from 'antd';
import {Link} from 'react-router-dom';

import './Flow.css';
import http from '../../service/http';

export default class FlowPage extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {

  }


  render() {
    return (
        <div className="flow-page page">
          flow
        </div>
    );
  }

}
