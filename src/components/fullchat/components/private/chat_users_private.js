import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatUsersPrivateMessages from './chat_users_private_messages';
import ChatUsersPrivateInput from './chat_users_private_input';

import { fullChatOpen, setUnread } from './../../chatActions';

class ChatUsersPrivate extends Component {
    constructor(props){
        super(props);
        this.socket = this.props.socket;
        this.channel = "";
        // this.state = { messages: [] };
    }
    componentWillUnmount(){
        
        // this.props.fullChatChattingWith("");
        // this.props.fullChatOpen(false);
        // this.socket.disconnect();
        // this.props.socket.leave(this.channel);
        // this.socket.emit('leavePrivate', { channel: this.channel });
    }
    // componentWillReceiveProps(nextProps){
    //     // console.log('eeeee', nextProps.messages);
    //     if(nextProps.messages){
    //         this.setState({ messages: nextProps.messages }, () => {
    //             // console.log(this.state);
    //         });
    //     }
    // }
    componentWillMount(){
        // console.log('-=-=-=', this.props.unread);
        // this.props.clearUnread(this.props.person);
        // console.log('ffff', this.props.fullChatOpen);
        // console.log('??DA?D', this.props.clearUnread);
        // console.log('mounting person', this.props.person);
    }
    componentDidMount(){
        // const me = localStorage.getItem('username');
        // this.socket.emit('joinPrivate', { channel: this.channel, me, id: this.socket.id, person: this.props.person }, () => {
        //     console.log('client - private');
        // });
        //useless?
        // this.socket.on('privateChatJoined', (data) => {
        //     console.log(data);
        // });
    }
    getInput(value){
        //person: the one writing to, writing: current user
        // console.log('v', value);
        if(!this.props.channel){
            let user = this.props.person;
            const me = localStorage.getItem('username');
            let channel = "";
            if(me > user){
                channel = `${me}${user}`;
            } else {
                channel = `${user}${me}`;
            }
            return this.socket.emit('createPrivateMessage', { message: value, channel: channel, writing: localStorage.getItem('username'), person: this.props.person });            
            
        }
        // if(value.mess)
        if(value !== ""){
            this.socket.emit('createPrivateMessage', { message: value, channel: this.props.channel, writing: localStorage.getItem('username'), person: this.props.person });            
        }
    }
    handleCloseButton(){
        this.props.fullChatOpen(false);
        let unread = this.props.unread;
        let user = this.props.person;
        // let unread = that.state.unread;
        if(unread && unread.length > 0 && unread.includes(user)){
             unread = unread.filter(u => u !== user);
             
        }
        this.props.setUnread(unread);
        // this.props.fullChatChattingWith("");

    }
    render(){
        // messages={this.props.messages}
        return (
            <div className="chat-full-users-private">
                {/* <div className="chat-full-users-private-header">Chatting with {this.props.person}</div> */}
                <div className="chat-full-close-button" onClick={this.handleCloseButton.bind(this)}>Close</div>
                <ChatUsersPrivateMessages  channel={this.props.channel} />
                <ChatUsersPrivateInput sendInput={this.getInput.bind(this)} />
            </div>
        );
    }
}

export default connect(null, { fullChatOpen, setUnread })(ChatUsersPrivate);