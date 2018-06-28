import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUrl, fullChatConnected, fullChatNotificationClear } from './../chatActions';
import ChatUsers from './users/chat_users';
import ChatGeneral from './general/chat_general';

import io from 'socket.io-client';

class Chat extends Component {
    constructor(props){
        super(props);
        // this.socket = io('http://localhost:3007');
        // this.socket = io('https://francais-api.azurewebsites.net');
        this.socket = io('https://safe-badlands-67690.herokuapp.com'); 
        this.channel = 'general';
    }
    componentWillUnmount(){
        this.props.setUrl('/');
        //maybe dont disconnect so that if user decides to do some exercises
        //and then chat again, he wont't lose messages?

        //without it, leaving /chat and entering again gives an error - setting state on unmounted component
        // this.socket.disconnect();
        // this.props.fullChatConnected(false);
    }
    componentWillMount(){
        this.props.setUrl('chat');
        this.props.fullChatNotificationClear();
    }
    componentDidMount(){
        // this.props.setUrl(true);
        // const chatButton = document.querySelector('.chat-icon');
        // const main = document.querySelector('.app');
        // chatButton.remove();
        // chatButton.parentNode.removeChild(chatButton);
        // main.removeEventListener('keydown');
        // chatButton.className += ' hide-chat-button';
        if(this.props.auth){
            this.socket.on('connect', () => {
                const user = localStorage.getItem('username');
                this.socket.emit('join',{ channel: this.channel, user }, (err) => {
                    console.log('client emits join');
                });
            });
        }
        // this.props.setUrl(window.location.href.slice(window.location.href.length-4));
        // this.props.fullChatConnected(true);
    }
    renderChat(){
        if(this.props.auth){
            //displayPrivateChat={this.displayPrivateChat.bind(this)}
            return [
                <div key="1" className="chat-full-users">
                    <ChatUsers socket={this.socket} />
                </div>,
                <div key="2" className="chat-full-main">
                    {/* messages and input field */}
                    <ChatGeneral socket={this.socket} />
                </div>
                // <div key="3" className="chat-full-channels">
                // </div>
            ];
        }
    }
    render(){
        return (
            <div className={"app-container app-container-front push-container "
                + (this.props.push ? 'app-push' : '') }>
                <div className="chat-full-container">
                    {this.renderChat()}
                </div>
                <div className="chat-full-private"></div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { setUrl, fullChatConnected, fullChatNotificationClear })(Chat);