import React, { Component } from 'react';

class InputFlashcard extends Component {
    constructor(props){
        super(props);
        this.state = { value: "" };
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.handleGuess(this.state.value);
    }
    handleChange = (event) => {
        const input = this.props.handleSpecialCharacters(event.target.value);
        this.setState({ value: input });
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input 
                    type="text" 
                    value={this.state.value} 
                    onChange={this.handleChange} 
                    autoFocus={true} />
            </form>
        );
    }
}

export default InputFlashcard;