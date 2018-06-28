import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpecialCharacters from './../../special_characters';

const initialState = {
    value: "",
    placeholder: "",
    initial: true,
    correct: false,
};

class InputVerb extends Component {
    constructor(props){
        super(props);
        this.state = initialState;
    }
    onSubmit(event){
        event.preventDefault();
        const value = this.state.value.trim();
        if(value === this.props.picked) this.setState({ value: "", initial: false, correct: true });
        if(value !== this.props.picked) {
            this.setState({ value: "", initial: false, correct: false });
            setTimeout(() => {
                this.setState(initialState);
            }, 400);
        }

        this.props.onAnswerChange(value);  
    }
    handleCharacterClick(id){
        let q = document.querySelector(id).textContent;
        this.setState({ value: `${this.state.value}${q}` });
        this.verbInput.focus();
    }
    handleKey(e){
        if(e.keyCode === 39){
            this.setState({ ...this.state, value: "", placeholder: this.props.picked });
        }
    }
    handleChange = (event) => {
        const input = this.props.handleSpecialCharacters(event.target.value);
        this.setState({ value: input });
    }
    displayPronoun(){
        if(this.props.pronoun){
            return <div className="verb-pronoun">{this.props.pronoun.word}</div>;
        }
    }
    render(){
        return(
            <div className="verb-field">
                <div className="verb-input">
                    {this.displayPronoun()}
                    <form className="verb-form" onSubmit={this.onSubmit.bind(this)}>
                        <input
                            ref={ input => this.verbInput = input }
                            onKeyDown={this.handleKey.bind(this)}
                            placeholder={this.state.placeholder}
                            className={"input-verb "+(!this.state.initial ? (this.state.correct ? 'very-correct' : 'incorrect') : '')}
                            type="text" autoFocus={true}
                            value={this.state.value}
                            onChange={this.handleChange} /> 
                    </form>
                </div>
                <SpecialCharacters handleClick={this.handleCharacterClick.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        lang: state.lang
    };
}

export default connect(mapStateToProps)(InputVerb);