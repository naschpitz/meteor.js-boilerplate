import React, { Component } from 'react';
import { Random } from 'meteor/random'

export default class MessageDisplay extends Component {
    constructor (props) {
        super(props);

        this.state = {
            messages: new Map(),
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.renderMessage = this.renderMessage.bind(this);

        if (this.props.message) {
            this.show(this.props.type, this.props.message);
        }
    }

    show(type, text, id) {
        if (!id)
            id = Random.id();

        const message = {
            type: type,
            text: text
        };

        const messages = this.state.messages;
        messages.set(id, message);

        this.setState({messages: messages});

        return id;
    }

    hide(id) {
        const messages = this.state.messages;
        messages.delete(id);

        this.setState({messages: messages});
    }

    renderMessage(message) {
        if (message.type === 'success')
            return(<div className="alert alert-success" role="alert">{message.text}</div>);

        if (message.type === 'warning')
            return(<div className="alert alert-warning" role="alert">{message.text}</div>);

        if (message.type === 'error')
            return(<div className="alert s-alert-error" role="alert">{message.text}</div>);
    }

    render() {
        return (
            <div>
                {Array.from(this.state.messages).map((message, index) => (
                    <span key={index} className="shaker">{this.renderMessage(message[1])}</span>
                ))}
            </div>
        );
    }
}