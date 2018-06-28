import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { setPrivateMessages } from './../../actions'

class ChatUsersPrivateMessages extends Component {
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.privateMessages){
    //         // console.log('---', nextProps.privateMessages);
    //     }
    // }
    componentWillUpdate(){
        // console.log('me die');
    }
    componentDidMount(){
        console.log('private mounted');
        // let last;
        // let secondLast;
        // if(this.container && this.container.lastChild && this.container.lastChild.previousElementSibling){
        //     last = this.container.lastChild.clientHeight;
        //     secondLast = this.container.lastChild.previousElementSibling.clientHeight;
        // }
        // console.log('handleScroll', this.container.scrollTop, this.container.scrollHeight, this.container.clientHeight);
        // if(this.container.scrollHeight > this.container.clientHeight){
        //+ another 20 perhaps? >= then it should always be greater, right?
        //|| this.container.scrollTop < this.container.scrollHeight - this.container.clientHeight
            // if(this.container.scrollTop+ this.container.clientHeight+last+secondLast >= this.container.scrollHeight){
                // console.log('qq', this.container.scrollTop, this.container.scrollHeight- this.container.clientHeight);
            //- this.container.clientHeight i dont need to substract it..
            this.container.scrollTop = this.container.scrollHeight;
        // }
    }
    componentDidUpdate(){
        //scroll to the bottom
        let last;
        let secondLast;
        if(this.container && this.container.lastChild && this.container.lastChild.previousElementSibling){
            last = this.container.lastChild.clientHeight;
            secondLast = this.container.lastChild.previousElementSibling.clientHeight;
        }
        // console.log('handleScroll', this.container.scrollTop, this.container.scrollHeight, this.container.clientHeight);
        // if(this.container.scrollHeight > this.container.clientHeight){
        //+ another 20 perhaps? >= then it should always be greater, right?
        //|| this.container.scrollTop < this.container.scrollHeight - this.container.clientHeight
            if(this.container.scrollTop+ this.container.clientHeight+last+secondLast >= this.container.scrollHeight){
                // console.log('qq', this.container.scrollTop, this.container.scrollHeight- this.container.clientHeight);
            //- this.container.clientHeight i dont need to substract it..
            this.container.scrollTop = this.container.scrollHeight;
        }
    }
    renderMessages(){
        const u = localStorage.getItem('username');
        let final = [];
        // console.log('PMs', this.props.privateMessages);
        // console.log('PM - should rerender!', this.props.privateMessages);
        if(this.props.privateMessages[0]){
            // console.log('0');
            if(this.props.privateMessages[0].messages){
                // console.log('1', this.props.fullChat.channel);
                //not this.props.channel because it doesnt exist if i leave and join with and open chat
                //the state is global now, set right after making the channel
            const messages = this.props.privateMessages.filter(message => message.channel === this.props.fullChat.channel);
            // console.log('2', messages);
            if(messages.length !== 0){
                final = messages[0].messages;
            }
            return final.map((message, index) => {
                return (
                    <div className="chat-full-users-private-messages-single"
                         key={index}>
                         <span 
                            className={"chat-full-users-private-messages-single-person " + (message.person !== u ? "other-person" : "")}>
                            {message.person}:</span> {message.message}
                    </div>
                );
            });
            }
        }
    }
    render(){
        // console.log('channel in messages', this.props.channel);
        // console.log('messages', this.props.messages);
        return (
            <div ref={div => this.container = div} className="chat-full-users-private-messages">
                {this.renderMessages()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        privateMessages: state.privateMessages,
        fullChat: state.fullChat
    };
}

export default connect(mapStateToProps)(ChatUsersPrivateMessages);