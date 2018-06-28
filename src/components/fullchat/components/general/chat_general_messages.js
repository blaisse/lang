import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatGeneralMessages extends Component {
    componentDidMount(){
        this.container.scrollTop = this.container.scrollHeight;
    }
    componentDidUpdate(){
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
            //- this.container.clientHeight i dont need to substract it..
            this.container.scrollTop = this.container.scrollHeight;
        }
    }
    renderMessages(){
        return this.props.global.map((item, index) => {
            return (
                <div className="chat-full-general-messages-single" 
                     key={index}>
                    <span className="chat-full-general-messages-single-user">{item.writing}</span>: {item.message}
                </div>
            );
        });
    }
    render(){
        return (
            <div ref={div => this.container = div} className="chat-full-general-messages">{this.renderMessages()}</div>
        );
    }
}

function mapStateToProps(state){
    return {
        global: state.global_messages
    };
}

export default connect(mapStateToProps)(ChatGeneralMessages);