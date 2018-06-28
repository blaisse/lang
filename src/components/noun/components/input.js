import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpecialCharacters from './../../special_characters';

class Input extends Component {
    state = { 
        value: ""
     };
     handleArticle = (event) => {
        const value = event.target.value;
        this.setState({ value: this.state.value, article: value });
    }
    handleCharacterClick(id){
        let q = document.querySelector(id).textContent;
        const x = this.state.article;
        this.setState({ value: `${this.state.value}${q}`, article: x });
        this.wordInput.focus();
    }
    render(){
        return (
            <input 
                disabled={this.props.correct === "2" ? "disabled" : ""} 
                className={(this.props.correct === "2" ? 'incorrect' : '')+(this.props.correct === "1" ? ' very-correct' : '')}
                ref={input => this.wordInput = input}
                type='text' placeholder='noun..'
                onChange={this.props.handleSth.bind(this)}
                value={this.state.value} 
                autoFocus={false} /> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
}

export default connect(mapStateToProps)(Input);