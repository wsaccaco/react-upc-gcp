import React, { Component } from 'react';
import {Form, Input, Card} from 'antd';

import './LeaderTechnical.css'


const FormItem = Form.Item;

export default class LeaderTechnical extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {

        return (
            <div className="leader-page page">
                <Card title="Evaluación Técnica" className="card-leader" style={{width: 400}}>
                    <p>Tiempo</p>
                    <Input/>
                    <p>Recursos adicionales</p>
                    <Input/>
                    <p>Limitaciones</p>
                    <LimitacionesList items={this.state.items} />
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="new-limitaciones">
                            What needs to be done?
                        </label>
                        <input
                            id="new-limitaciones"
                            onChange={this.handleChange}
                            value={this.state.text}
                        />
                        <button>
                            Add #{this.state.items.length + 1}
                        </button>
                    </form>
                </Card>
            </div>
        );
    }
    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
    }
}

class LimitacionesList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}
