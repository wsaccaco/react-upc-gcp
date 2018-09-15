import React, {Component} from 'react';
import {List, Icon, Card, Badge, Switch, Divider} from 'antd';
import FormSendLeaderTechnical from '../formSendLeaderTechnical/formSendLeaderTechnical'
import './DescriptionMeta.css'

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

  _getClass(status){
    switch (status) {
      case "Pendiente":
        return 'pending';
      case "Por Evaluar":
        return 'evaluating';
      case "Aprobado":
        return 'approved';
      case "Rechazado":
        return 'disapproved';
      default:
        break;
    }
  }

  render() {
    let {needEvaluation, data : {lir_RequiereDocumentar, lir_EsFuncional, lir_Codigo, lit_Codigo, est_Estado, ...props}} = this.state;

    return (
      <Card className="card-details-technical" bordered={true}>
          <div style={{display: 'inline-flex'}}>
            <p><strong>Documentar : </strong>{lir_RequiereDocumentar ? "Si" : "No"}</p>
            <Divider type={"vertical"} />
            <p>
              <strong>Requerimiento Funcional : </strong>
              {lir_EsFuncional ? "Si" : "No"}
            </p>
          </div>
          <p>
            <strong>Estado : </strong>
            <span className={this._getClass(est_Estado)}>{est_Estado}</span>
          </p>
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