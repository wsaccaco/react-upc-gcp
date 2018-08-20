import React, {Component} from 'react';
import {List, Icon, Card} from 'antd';
import {Link} from 'react-router-dom';
import './FlowTechnical.css';

import http from '../../service/http';

export default class FlowTechnical extends Component {

  state = {
    dataSource: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchRequirementChanged();
  }

  fetchRequirementChanged() {
    let {rfc_id} = this.props;

    this.setState({
      loading: true,
    });

    http('C0002G0004', 'POST', {rfc_Codigo: rfc_id}, (response) => {
      this.setState({
        dataSource: response,
        loading: false,
      });
    }, (e) => {
      console.error(e);
    });
  }

  IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
      {text}
  </span>
  );

  DescriptionMeta() {
    return <Card className="card-details-technical" bordered={false}>
      <p>
        <strong style={{display: 'block'}}>Probando : </strong>
        Card content
      </p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>;
  }

  render() {
    let {dataSource, loading} = this.state;
    let {IconText, DescriptionMeta} = this;
    return (

      <div className="flow-technical component">
        <List
          itemLayout="vertical"
          loading={loading}
          grid={{gutter: 16, xs: 1, sm: 2}}
          dataSource={dataSource}
          renderItem={({lir_Nombre, lir_Resumen}, index) => (
            <List.Item
              key={index}
              actions={[
                <IconText type="star-o" text="156"/>,
                <IconText type="like-o" text="156"/>,
                <IconText type="message" text="2"/>]}
            >
              <List.Item.Meta
                className="item-meta"
                title={lir_Nombre}
                description={<DescriptionMeta />}
              />
              {lir_Resumen}
            </List.Item>
          )}
        />
      </div>
    );
  }

}