import React, {Component} from 'react';
import {List, Icon, Card, Badge, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {getPrioridad} from '../../tools/tools';
import DescriptionMeta from '../DescriptionMeta/DescriptionMeta';
import {LeaderTechnical} from '../../context/LeaderTechnical';
import './FlowTechnical.css';

import http from '../../service/http';

export default class FlowTechnical extends Component {

  state = {
    dataSource: [],
    loading: false,
    leaders: [],
  };

  componentDidMount() {
    this.fetchRequirementChanged();
    this.fetchLeaderTechnical();
  }

  fetchRequirementChanged() {
    let {rfc_id} = this.props;

    this.setState({
      loading: true,
    });

    http(`rfc/${rfc_id}/nuevosRequerimientos`, 'GET', {}, (response) => {
      this.setState({
        dataSource: response,
        loading: false,
      });
    }, (e) => {
      console.error(e);
    });
  }

  fetchLeaderTechnical() {
    http('/LiderTecnico', 'GET', {}, (leaders) => {
      this.setState({
        leaders,
      });
    });
  }

  IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
      {text}
  </span>
  );

  TitleMeta({title, prioridad}) {
    let {text, status} = getPrioridad(prioridad);
    return (<span className="title-meta-wrap">

      <span>{title}</span>
      <Badge status={status} text={
        <span>
          {text}
          <Tooltip title="Prioridad">
            <Icon type="question-circle" style={{marginLeft: '5px'}}/>
          </Tooltip>
        </span>}/>
    </span>);
  }

  render() {
    let {dataSource, loading, leaders} = this.state;
    let {IconText, TitleMeta} = this;

    return (
      <div className="flow-technical component">
        <List
          itemLayout="vertical"
          loading={loading}
          grid={{gutter: 16, xs: 1, sm: 2}}
          dataSource={dataSource}
          renderItem={(
            {lir_Nombre, lir_Resumen, lir_Prioridad, lit_Codigo, ...props}, index) => {
            return (
              <List.Item
                key={index}
                style={{border: "2px solid #efefef !important"}}
              >
                <LeaderTechnical.Provider value={leaders}>
                  <List.Item.Meta
                    className="item-meta"
                    title={[<TitleMeta key={index} title={lir_Nombre} prioridad={lir_Prioridad}/>]}
                    description={<DescriptionMeta data={props} lit_Codigo={lit_Codigo} />}
                  />
                </LeaderTechnical.Provider>
                  <p>
                    <strong>Resumen : </strong>{lir_Resumen}
                    </p>
              </List.Item>
            );
          }}
        />
      </div>
    );
  }

}