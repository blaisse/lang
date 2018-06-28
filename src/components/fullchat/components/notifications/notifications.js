import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fullChatNotificationClear } from './../../chatActions';

const actions = { fullChatNotificationClear };

class Notifications extends Component {
    id = 0;
    componentDidUpdate(){
        if(this.props.fullChat.notification){
            clearTimeout(this.id);
            this.id = setTimeout(() => {
                this.props.fullChatNotificationClear();
            }, 5000);
        }
    }
    render(){
        if(this.props.fullChat && !this.props.fullChat.notification) return "";
        return (
            <div className="chat-full-notification">New message from 
                <span className="other-person-notification">{this.props.fullChat.notification.person}</span>
                <div>{this.props.fullChat.notification.message}</div>
            </div>
        );
    }
}

const mapState = state => {
    return {
        fullChat: state.fullChat
    }
};

export default connect(mapState, actions)(Notifications);