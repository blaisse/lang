import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpecialCharacters from './../../special_characters';

class InputNoun extends Component {
    state = { 
        value: "",
        article: ""
     };

    handleArticle(event){
        let q = event.target.value;
        this.setState({ value: this.state.value, article: q });
    }
    handleCharacterClick(id){
        let q = document.querySelector(id).textContent;
        const x = this.state.article;
        this.setState({ value: `${this.state.value}${q}`, article: x });
        this.wordInput.focus();
    }
    onSubmit(event){
        event.preventDefault();
        this.props.sendInput(this.state.article.trim(), this.state.value.trim(), this.nameInput);
        this.nameInput.focus();
        this.setState({ value: "", article: "" });
    }
    handleChange = (event) => {
        const input = this.props.handleSpecialCharacters(event.target.value);
        this.setState({ value: input });
    }
    displaySpecialCharacters(){
        
    }
    render(){
        return (
            <div className="noun-input-container">
                <form className="noun-form" onSubmit={this.onSubmit.bind(this)}>
                    <input disabled={this.props.correct === "2" ? "disabled" : ""}
                        className={"article-input "+(this.props.correct === "2" ? 'incorrect' : '')+(this.props.correct === "1" ? ' very-correct' : '')}
                        ref={input => this.nameInput = input}
                        type='text' placeholder='article..'
                        onChange={this.handleArticle.bind(this)} value={this.state.article} autoFocus={true} />

                    <input disabled={this.props.correct === "2" ? "disabled" : ""} 
                        className={(this.props.correct === "2" ? 'incorrect' : '')+(this.props.correct === "1" ? ' very-correct' : '')}
                        ref={input => this.wordInput = input}
                        type='text' placeholder='noun..'
                        onChange={this.handleChange}
                        value={this.state.value} autoFocus={false}
                    /> 
                     {/* <input ref={input => this.wordInput = input} type='text' placeholder='noun..' onChange={this.handleChange.bind(this)} value={this.state.value} autoFocus={false} />  */}
                    <button className="hide-button">Submit</button>
                </form>
                {this.displaySpecialCharacters()}
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

export default connect(mapStateToProps)(InputNoun);