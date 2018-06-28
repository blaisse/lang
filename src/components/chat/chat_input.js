import React, { Component } from 'react';

class ChatInput extends Component {
    constructor(props){
        super(props);
        this.state = { value: "" };
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.socket.emit('createMessageSmall', {
            text: this.state.value,
            user: localStorage.getItem('username')
        });
        this.setState({ value: "" });
    }
    handleChange(event){
        // console.log(event.target.value);
        this.setState({ value: event.target.value });
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input autoFocus={true} type="text" className="chat-input" value={this.state.value} onChange={this.handleChange.bind(this)} />
            </form>
        );
    }
}

export default ChatInput;