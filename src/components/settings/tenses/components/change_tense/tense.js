import React, { Component } from 'react';

class Tense extends Component {
    state = { clicked: this.props.selected };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked }, () => this.props.clickTense(this.props.tense, this.state.clicked));
    }
    render(){
        return (
            <div className={`change-tense-item ${this.state.clicked ? "change-tense-item-selected" : ""}`} onClick={this.handleClick}>
                {this.props.tense}
            </div>
        );
    }
}

export default Tense;