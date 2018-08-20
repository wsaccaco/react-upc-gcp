import React, { Component } from 'react';
import {Card} from 'antd';
import './LeaderTechnical.css'

export default class LeaderTechnical extends Component {



  render() {

    return (
      <div className="leader-page page">
        <Card title="Leader" className="card-leader" style={{width: 400}}>
          <p>Parrafo</p>
        </Card>
      </div>
    );
  }

}
