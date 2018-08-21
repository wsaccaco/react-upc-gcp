import React, {Component} from 'react';
import {List, Icon, Card, Badge} from 'antd';
import {Link} from 'react-router-dom';
import {getPrioridad} from '../../tools/tools'
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
        <strong>Documentar : </strong>
        Si
      </p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>;
  }

  TitleMeta({title, prioridad}){
    let {text, status} = getPrioridad(prioridad);
    return (<span className="title-meta-wrap">
      {title}
      <Badge status={status} text={text} />
    </span>)
  }

  render() {
    let {dataSource, loading} = this.state;
    let {IconText, DescriptionMeta, TitleMeta} = this;
    return (

      <div className="flow-technical component">
        <List
          itemLayout="vertical"
          loading={loading}
          grid={{gutter: 16, xs: 1, sm: 2}}
          dataSource={dataSource}
          renderItem={({lir_Nombre, lir_Resumen, lir_Prioridad, ...props}, index) => {
            console.log(props)
            return (
              <List.Item
                key={index}
                actions={[
                  <IconText type="star-o" text="156"/>,
                  <IconText type="like-o" text="156"/>,
                  <IconText type="message" text="2"/>]}
              >
                <List.Item.Meta
                  className="item-meta"
                  title={[<TitleMeta key={index} title={lir_Nombre} prioridad={lir_Prioridad} />]}
                  description={<DescriptionMeta/>}
                />
                {lir_Resumen}
              </List.Item>
            );
          }}
        />
      </div>
    );
  }

}