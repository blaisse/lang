import React, { Component } from 'react';

class FlashcardTitle extends Component {
    constructor(props){
        super(props);
        this.state = { title: "" };
    }
    handleChange(event){
        this.setState({ title: event.target.value }, () => {
            this.props.sendTitle(this.state.title);
        });
    }
    render(){
        return (
            <div>
                <input
                    className="flashcards-add-title-input"
                    type="text"
                    value={this.state.title} 
                    placeholder="Title.." 
                    onFocus={this.props.unsetError}
                    onChange={this.handleChange.bind(this)} />
            </div>
        );
    }
}

export default FlashcardTitle; 