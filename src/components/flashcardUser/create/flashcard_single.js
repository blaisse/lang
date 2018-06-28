import React, { Component } from 'react';

class FlashcardSingle extends Component {
    constructor(props){
        super(props);
        this.state = { value: "" };
    }
    handleChange(event){
        // const input = this.props.handleSpecialCharacters(event.target.value);
        // console.log(input);
        // console.log(this.props.lang);
        // this.props.handleFlashcard(event, this.props.lang, this);
        // console.log(event.target.value);
        // this.setState({ value: input }, () => {
        //     this.props.handleOutput(this.state.value); 
        // });
        this.props.handleOutput(event.target.value);
    }
    render(){
        return (//this.handleChange.bind(this)
            <textarea 
                data-index={this.props.index} 
                onKeyDown={this.props.handleTab} 
                onChange={this.handleChange.bind(this)} 
                // value={this.state.value}
                className="flashcard-edit">
            </textarea>
        );
    }
}

export default FlashcardSingle;