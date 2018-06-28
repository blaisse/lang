import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    setPrivateMessages,
    setUserList,
    fullChatOpen,
    fullChatChattingWith,
    fullChatPrivateChannel,
    setUrl,
    fullChatNotification,
    fullChatNotificationClear,
    fullChatOldNotification,
    setUnread,
    clearUnread
    
} from './../../chatActions';
import ChatUsersPrivate from '../private/chat_users_private';

// import reducers from './../../reducers';

class ChatUsers extends Component {
    constructor(props){
        super(props);
        this.socket = this.props.socket;
        this.state = { users: [], open: false, private: "", unread: [], messages: [] };
        this.channel = "";
    }
    // componentWillReceiveProps(nextProps){
        // this.props.setPrivateMessages(nextProps);
        // console.log('prooops', nextProps);
        // this.props.setPrivateMessages(nextProps.privateMessages);
        // if(nextProps.fullChat.unread){
            // console.log('---', nextProps.fullChat.unread);
        //     let x = this.state.unread.filter(item => item !== localStorage.getItem('username'));
        //     // x.push(nextProps.fullChat.unread);
        //     this.setState({ unread: nextProps.fullChat.unread });
        // }
    // }
    // componentWillUpdate(nextProps, nextState){
    //     // console.log('???????', nextState.messages);
    //     // if(nextProps.privateMessages){
    //     //     this.props.setPrivateMessages(nextProps.privateMessages);
    //     // }
    //     if(nextState.messages){
    //         this.props.setPrivateMessages(nextState.messages);
    //     }
    // }
    // componentWillReceiveProps(nextProps){
    //     console.log('props inc', nextProps);
    // }
    // componentWillUpdate(){
    //     console.log('update');
    // }
    componentWillMount(){
        // console.log('about to be mounted!');

    }
    componentDidMount(){
       
            this.socket.on('updateList', (list) => {
                // console.log('pls update list', list);
                let filteredList = list.filter(user => user !== localStorage.getItem('username'));
                // console.log('pls work', filteredList, list);
                //online users - global state
                this.props.setUserList(filteredList);
                // console.log('pls rerender', this.props.userList);
                // this.setState({ users: filteredList }, () => {
                //     console.log('State: ', this.state.users);
                // });
            });
         
            // this.socket.on('acceptPrivateChat', (user) => {
            //     console.log('me is private very open yes');
            // });
            // if(this.props.url === 'chat'){
            this.socket.on('privateChatOpenNotify', (user) => {
                // console.log('Private chat open', user, this.state.private);
                this.socket.emit('joinPrivateChat', { channel: user.channel, person: user.person, me: localStorage.getItem('username') });
                //!this.state.open &&
                // if(user.person !== this.state.private){
                //     let c = [];
                //     c = this.state.unread.filter(user => user !== user.person);
                //     c.push(user.person);
                //     //WHY?
                //     // console.log('c', this.state.unread, c);
                //     this.setState({ unread: c }, () => {
                //         // console.log('state set:', this.state.unread);
                //     });
                // }
                // this.socket.emit('joinPrivateChat', { channel: user.channel });
            });
            this.socket.on('sendPrivateMessage', (data) => {
                // this.socket.emit('joinPrivateChat', { channel: data.channel, person: data.writing, me: localStorage.getItem('username') });
                // console.log('data.writing', data);
                // if(data.writing !== this.state.private){
                //     let c = [];
                //     c = this.state.unread.filter(user => user !== data.writing);
                //     c.push(data.writing);
                //     //WHY?
                //     // console.log('c', this.state.unread, c);
                    // this.setState({ unread: "xd" }, () => {
                    //     console.log('state set:', this.state.unread);
                    // });
                // }
                this.props.setUnread(data);
                //emit joinPrivate and check whether this socket is in the room else connect to it?
                // console.log('message received');
                const me = localStorage.getItem('username');
                this.socket.emit('joinPrivate', { channel: data.channel, me, id: this.socket.id, person: data.writing });

                //UNREAD MESSAGES DONE HERE?
                // console.log('uuu', window.location.href.slice(window.location.href.length-4));
                if(window.location.href.slice(window.location.href.length-4) !== 'chat'){
                    // if(!this.props.fullChat.notification){
                        // if(this.props.fullChat.notification){
                        // }
                        // this.props.fullChatOldNotification(null);
                        const y = { person: data.writing, message: data.message };
                        this.props.fullChatNotification(y);
                        //set old notification as well, menu will compare
                       
                        // setTimeout(() => {
                        //     // console.log('data', this.props.fullChat);
                        //     // this.props.fullChatOldNotification(data.writing);
                        //     // console.log('clear notification');
                        //     this.props.fullChatNotificationClear();
                        // }, 4000);
                    // }
                    //emit notifcation to the user - he is not on /chat route
                }
                // if(window.location.href.slice(window.location.href.length-4)){
                //     console.log('emit to server..');
                //     data.me = localStorage.getItem('username');
                //     this.socket.emit('sendHelp', data);
                //     this.socket.on('sendingHelp', (message) => {
                //         console.log('WTF ME IS HELP?', message);
                //     });
                // }
                // console.log('url', window.location.href.slice(window.location.href.length-4));
                
                // let messages = this.props.privateMessages.filter(item => item.channel === data.channel);
                let obj = {};
                let final = [];
                // let withoutOldMessages = [];
                // if(messages.length === 0){
                    obj = {
                        channel: data.channel,
                        messages: [{ person: data.writing, message: data.message }]
                    };
                    // pls.push(obj);
                    final = obj;
                // } else {
                //     //this seems all right
                //     messages[0].messages.push({ person: data.writing, message: data.message });
                //     // let withoutOldMessages = this.props.privateMessages.filter(item => item.channel !== data.channel);
                //     // withoutOldMessages.push(messages[0]);
                //     // final = withoutOldMessages;
                //     final = messages;
                // }
                let q = Array.isArray(final);

                if(q){
                    this.props.setPrivateMessages(final[0]);
                } else {
                    this.props.setPrivateMessages(final);
                }            
                // console.log('3333', this.props.privateMessages);
                // const m = this.props.privateMessages;
                // messages.push(message);
                // this.setState({ messages: [] }, () => {
                //     // this.props.setPrivateMessages(final);
                //     // console.log('wtf', this.state.messages);
                // });
            });

        // }
       
    }
    handleClick(event, that, user, index){
        if(this.props.fullChat.unread){
            // console.log('WTF! U N R E A D', this.props.fullChat.unread);
            // this.props.clearUnread(user);
        }
        // if(this.state.unread){
        //     console.log('me is change state');
        //     let qq = this.state.unread.filter(u => u !== user);
        //     this.setState({ unread: qq });
        // }
        // if(!this.props.fullChat.open){
        this.props.fullChatOpen(true);
        this.props.fullChatChattingWith(user);
            // if(this.props.fullChat.unread){
                // console.log('unreads to be handled! gogo');
                // this.props.clearUnread(user);            
            // }
        // }
       

        //should it open up a modal on click with a seperatre form?
        //it would be working in the background and show unread messages
        const me = localStorage.getItem('username');
        let channel = "";
        if(me > user){
            channel = `${me}${user}`;
        } else {
            channel = `${user}${me}`;
        }
        this.channel = channel;
        
        // if(!this.props.fullChat.open){
            this.props.fullChatPrivateChannel(channel);            
        // }
        // console.log('e', this.props.privateMessages);

        const help = this.props.privateMessages.filter((item) => {
            return item.channel === this.channel;
        });
        //cant do it for more than one user, i cant connect to the other room..
        if(help.length > 0){
            console.log('already in private!');
            // const me = localStorage.getItem('username');
            // that.socket.emit('joinPrivate', { channel, me, id: this.socket.id, person: user }, () => {
            //     console.log('client - private');
            // });
        } else if(!that.state.open){
            const me = localStorage.getItem('username');
            that.socket.emit('joinPrivate', { channel, me, id: this.socket.id, person: user }, () => {
                console.log('client - private');
            });
        } else {
            const me = localStorage.getItem('username');
            that.socket.emit('joinPrivate', { channel, me, id: this.socket.id, person: user }, () => {
                console.log('client - private');
            });
        }

        //deletes user from unread array - on click "unread" will disappear if its there
        // console.log('5345', this.props.fullChat.unread);
        if(this.props.fullChat.unread){
            let unread = this.props.fullChat.unread;
            // let unread = that.state.unread;
            if(unread.length > 0 && unread.includes(user)){
                 unread = unread.filter(u => u !== user);
            }
            this.props.setUnread(unread);
            
            // console.log('54555', unread);
        }
        

        //if the clicked user is the same as the one we are chatting with -> close
        // if(user === that.state.private){
            // console.log(this.props.fullChat);
            // console.log('??', this.props.fullChat.chattingWith);
            // this.props.fullChatChattingWith(user);
            
        // console.log('3423', this.props.fullChat.chattingWith, this.props.fullChat.unread);
        if(user === this.props.fullChat.chattingWith){
            // let unread = this.props.fullChat.unread;
            // // let unread = that.state.unread;
            // if(unread.length > 0 && unread.includes(user)){
            //      unread = unread.filter(u => u !== user);
            // }
            // this.props.setUnread(unread);
            this.props.fullChatChattingWith("");
            // console.log('????');
            this.props.fullChatOpen(false);
            // console.log('?11111');
            this.props.setUnread(this.props.fullChat.unread);
            // return that.setState({ open: false, private: "", unread });
        }
        // this.channel = channel;
        // const open = !that.state.open;
        // that.setState({ open: true, private: user, unread }, () => {
        //     // console.log('ttttt', that.state);
        //     if(that.state.open){
   
        //     }
        // });
        //here possibly connect to the private chat instead of in ChatUsersPrivate
        //it should keep up the connection?
    }
    displayPrivate(){
        // console.log('qqqqq', this.props.privateMessages);
        // if(this.state.open){
           if(this.props.fullChat.open){
            //pick the right messages
            // console.log('why no work?', this.props.privateMessages);
            // let final = [];
            // const messages = this.state.messages.filter(message => message.channel === this.channel);
            // if(messages.length !== 0){
            //     final = messages[0].messages;
            // }
            //messages={this.props.privateMessages} person={this.state.private}
            // console.log('user', this.props.fullChat.chattingWith);
            return (
                <ChatUsersPrivate unread={this.props.fullChat.unread} clearUnread={this.props.clearUnread} person={this.props.fullChat.chattingWith} socket={this.socket} channel={this.channel} />
            );
        }
    }
    handleUnread(user){
        // console.log('h4lp',this.state.unread);
        // console.log('render', this.props.fullChat.unread);
        if(this.props.fullChat.unread){
        // if(this.state.unread){
            const unread = this.props.fullChat.unread;
            // const unread = this.state.unread;
            // console.log('they be here', unread);            
            if(unread.length > 0 && unread.includes(user)){
                return (<div className="chat-full-circle"></div>);
            }
        }
        // const unread = this.state.unread;
        // if(unread.length > 0 && unread.includes(user)){
        //     return " unread";
        // }
    }
    renderUsers(){//this.state.users
        if(this.props.userList.length > 0){
            return this.props.userList.map((user, index) => {
                return (
                    //??????event
                    <div onClick={(event) => {
                        this.handleClick(event, this, user, index);
                    }} 
                        className={"chat-full-users-single "+(this.props.fullChat.chattingWith===user ? "chat-full-users-single-clicked" : "")}
                        key={index}>
                        {user}
                        {this.handleUnread(user)}
                    </div>
                );
            });
        }
    }
    render(){
        // console.log('propppps', this.props.fullChat);
        
        // console.log('fullChat state-', this.props.fullChat);
        // console.log('it woorkijng? ', this.props.privateMessages);
        // console.log('tttt', this.state.open);
        return (
            <div>
                {this.displayPrivate()}
                <div className="chat-full-users-title">Online users:</div>
                <div className="chat-full-users-container">{this.renderUsers()}</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        privateMessages: state.privateMessages,
        userList: state.userList,
        url: state.url,
        fullChat: state.fullChat
    };
}

export default connect(mapStateToProps, { 
    setPrivateMessages,
    setUrl,
    setUserList,
    fullChatOpen,
    fullChatChattingWith,
    fullChatPrivateChannel,
    fullChatNotification,
    fullChatNotificationClear,
    fullChatOldNotification,
    setUnread,
    clearUnread

})(ChatUsers);