import React, { Component } from 'react';

class ChatMessages extends Component {
    componentDidUpdate(){
        let last = 0;
        if(this.divMessages && this.divMessages.lastChild){
            // console.log('impoerant', this.divMessages.lastChild.offsetHeight);
            last = this.divMessages.lastChild.offsetHeight;
        }
        // console.log('hello', this.props.messages[this.props.messages.length-1]);
        // console.log('scrollHeight', this.divMessages.scrollHeight, "scrollTop", this.divMessages.scrollTop, "client", this.divMessages.clientHeight);
        // if((this.divMessages.clientHeight + this.divMessages.scrollTop) < this.divMessages.scrollHeight){
            if(this.divMessages.clientHeight+this.divMessages.scrollTop+last+last >= this.divMessages.scrollHeight){
            // console.log('do some scrolling', this.state.messages);
            this.divMessages.scrollTop = this.divMessages.scrollHeight;
            // console.log('scrollTop', this.divMessages.scrollTop, this.divMessages.scrollHeight);
        }
    }
    showStats(){
     
    }
    renderMessages(){
        const u = localStorage.getItem('username');
        // console.log('scrollHeight',this.divMessages.scrollHeight);
        return this.props.messages.map((item, i) => {
            return (
                <div className="chat-container-messages-single" key={i}>
                    <span className={"chat-container-messages-single-user " + (item.user !== u ? "other-user" : "")}>{item.user}:</span>
                    <span className="chat-single-message-span">{item.text}</span>
                </div>
            );
        });
    }
    render(){
        return (
            <div ref={ div => this.divMessages = div } className="chat-container-messages">
                {this.renderMessages()}
            </div>
        );
    }
}

export default ChatMessages;