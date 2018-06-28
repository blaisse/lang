import React, { Component } from 'react';

class AvailableBlocks extends Component {
    handleClick = (word, index) => () => this.props.setAnswer(word, index);
    displayBlocks(){
        return this.props.blocks.map((word, index) => {
            return !word.set ? 
                <div className="sentence-block-mixed" key={index} onClick={this.handleClick(word.item, index)}>{word.item}</div> : 
                <div className="sentence-block-mixed sentence-block-mixed-hide bg-noun" key={index}>{word.item}</div>;
        });
    }
    render = () => <div className={"sentence-block-mixed-container"}>{this.displayBlocks()}</div>;
}

export default AvailableBlocks;