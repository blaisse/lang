import React, { Component } from 'react';

class ClickTense extends Component {
    state = { clicked: false };
    handleClick(){
        this.setState({ clicked: !this.state.clicked }, () => {
            this.props.sendState(this.state.clicked, this.props.tense);
        });
    }
    render(){
        return (
            <div
                onClick={this.handleClick.bind(this)} 
                className={"tense-link " + (this.state.clicked ? 'tense-clicked' : '') }>
                {this.props.tense.replace("_", " ")}  
            </div>
        );
    }
}

export default ClickTense;