import React, { Component } from 'react';
import SpecialCharacters from './../../special_characters';

class PluralInput extends Component {
    constructor(props){
        super(props);
        this.state = { value: "", correct: false, incorrect: false, placeholder: "" };
        this.full = "";
    }
    //this.props.lang is passed by SpecialCharacters
    componentWillMount(){
        //This needs to be changed
        if(this.props.lang === 'french'){
            this.full = `les ${this.props.correct}`
        } else {
            this.full = `die ${this.props.correct}`;
        }
    }
    handleSubmit(event){
        event.preventDefault();
        // this.props.handleCorrect(this.state.value);
        // let full = "";
        // if(this.props.lang === 'french'){
        //     full = `les ${this.props.correct}`
        // } else {
        //     full = `die ${this.props.correct}`;
        // }
        // if(this.props.auth){
        //     this.props.setLastCorrect('plural', this.props.correct);            
        // }
        if(this.state.value.trim() === this.full){
            this.setState({ value: "", correct: true }, () => {
                this.props.handleCorrect();
            });
        } else {
            this.setState({ ...this.state, incorrect: true, value: '', placeholder: '' });
            setTimeout(() => {
                this.setState({ incorrect: false });
            }, 300);
        }
    }
    handleCharacterClick(id){
        let q = document.querySelector(id).textContent;
        this.setState({ value: `${this.state.value}${q}` });
        // this.wordInput.focus();
    }
    handleChange = (event) => {
        // const v = event.target.value;
        // this.setState({ value: v });
        const input = this.props.handleSpecialCharacters(event.target.value);
        this.setState({ value: input, placeholder: '' });
    }
    handleKeys(e){
        if(e.keyCode === 39){
            if(this.state.placeholder) return this.setState({ placeholder: '' });
            this.setState({ ...this.state, value: "", placeholder: this.full });
        }
    }
    render(){
        return (
            <div className="plural-form-container">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input 
                        ref={ input => this.pluralInput = input }
                        className={"plural-input "+(this.state.correct ? ' very-correct' : '')+(this.state.incorrect ? ' incorrect' : '')}
                        type="text"
                        value={this.state.value}
                        placeholder={this.state.placeholder}
                        onKeyDown={this.handleKeys.bind(this)}
                        onChange={this.handleChange}
                        autoFocus={true} />
                </form>
                <SpecialCharacters handleClick={this.handleCharacterClick.bind(this)} />
            </div>
        );
    }
}

export default PluralInput;