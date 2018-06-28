import React, { Component } from 'react';

class ChatGeneralInput extends Component {
    constructor(props){
        super(props);
        this.state = { value: "" };
    }
    handleChange(e){
        this.setState({ value: e.target.value });
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.value){
            this.props.socket.emit('createMessage', { writing: localStorage.getItem('username'), message: this.state.value });
            this.setState({ value: "" });
        }
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="chat-full-general-input">
                <input 
                    autoFocus={true}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    className="chat-full-general-input-field"
                    value={this.state.value}
                />
            </form>
        );
    }
}

export default ChatGeneralInput;