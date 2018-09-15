import React, {Component} from 'react';
import {List, Icon, Card, Badge, Switch, Divider} from 'antd';
import FormSendLeaderTechnical from '../formSendLeaderTechnical/formSendLeaderTechnical'

export default class DescriptionMeta extends Component {
  constructor(props) {
    super(props);
    let {data} = props;
    this.state = {
      data,
      needEvaluation: false
    }
  }

  onChange = (needEvaluation) => {
    this.setState({
      needEvaluation
    })
  };

  render() {
    let {needEvaluation, data : {lir_RequiereDocumentar, lir_EsFuncional, lir_Codigo, lit_Codigo, ...props}} = this.state;

    return (
      <Card className="card-details-technical" bordered={true}>
          <div style={{display: 'inline-flex'}}>
              <p><strong>Documentar : </strong>{lir_RequiereDocumentar ? "Si" : "No"}</p>
              <p> <Divider type={"vertical"} /> </p>
              <p><strong>Requerimiento Funcional : </strong>{lir_EsFuncional ? "Si" : "No"}</p>
          </div>
          <p>
              <strong>Evaluar : </strong>
              <Switch
                  checkedChildren={<Icon type="check" />}
                  defaultChecked={needEvaluation}
                  onChange={this.onChange} unCheckedChildren={<Icon type="cross" />} />
          </p>
          <FormSendLeaderTechnical disabled={needEvaluation} lir_Codigo={lir_Codigo} lit_Codigo={lit_Codigo} />
      </Card>
    );
  }
}