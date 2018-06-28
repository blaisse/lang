import React, { Component } from 'react';

class SentenceBlockAnswer extends Component {
    handleClick = (index) => () => this.props.unsetAnswer(index);
    displayAnswer(){
        return this.props.blocks.map((item, index) => {
            return (
                <div className={"sentence-block-mixed "
                + (this.props.correct ? 'sentence-block-correct' : '')
                + (this.props.incorrect ? 'sentence-block-incorrect': '')}
                    onClick={this.handleClick(item.index)}
                    key={index}>
                    {item.word}
                </div>
            );
        });
    }
    render(){
        return (
            <div className={"sentence-block-mixed-container "
                 + (this.props.correct ? 'sentence-block-correct' : '')
                 + (this.props.incorrect ? 'sentence-block-incorrect': '') }>
                 {this.displayAnswer()}
            </div>
        );
    }
}

export default SentenceBlockAnswer;