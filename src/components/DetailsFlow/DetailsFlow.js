import React, {Component} from 'react';
import {Button, Col, Row, Steps, Card, List} from 'antd';
import {Link} from 'react-router-dom';

import http from '../../service/http';

const {Meta} = Card;

export default class FlowPage extends Component {

  state = {
    dataSource : this.props.dataSource
  };

  static getDerivedStateFromProps(nextProps, prevState){
    let { dataSource } = nextProps;
    return {
      dataSource
    }
  }


  render() {
    let {dataSource: {por_Nombre, per_Email, pro_Nombre, per_Nombre, rfc_Asunto}} = this.state;
    let {loading} = this.props;
    return (
        <div className="details-flow component">
          <Card
              className="card-details"
              loading={loading}
              title={`Detalle del RFC - ${rfc_Asunto}`}>
            <Row gutter={16}>
              <Col span={12}>
                <List size="small">
                  <List.Item>
                    <List.Item.Meta
                        title={'Portafolio'}
                        description={por_Nombre ? por_Nombre : <Button
                            shape="circle" loading size="small"/>}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                        title="Proyecto"
                        description={pro_Nombre ? pro_Nombre : <Button
                            shape="circle" loading size="small"/>}
                    />
                  </List.Item>
                </List>
              </Col>
              <Col span={12}>
                <List size="small">
                  <List.Item>
                    <List.Item.Meta
                        title="Solicitante"
                        description={per_Nombre ? per_Nombre : <Button
                            shape="circle" loading size="small"/>}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                        title="Email"
                        description={per_Email ? per_Email : <Button
                            shape="circle" loading size="small"/>}
                    />
                  </List.Item>
                </List>
              </Col>
            </Row>
          </Card>
        </div>
    );
  }

}
