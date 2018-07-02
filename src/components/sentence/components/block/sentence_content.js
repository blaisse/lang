import React, { Component } from 'react';
import SentenceBlockAnswer from './sentence_blocks_answer';
import AvailableBlocks from './available_blocks';

class SentenceContent extends Component {
    state = { 
        answer: [],
        blocks: this.props.blocks.mixedFully.map((item, index) => { 
            return { item, set: false, index };
        }),
        correct: false, 
        incorrect: false, 
    };
    setAnswer = (word, index) => {
        const blocks = this.state.blocks;
        blocks[index].set = true;
        this.setState({ blocks, answer: [...this.state.answer, { word, index }] }, async () => {
            if(this.state.answer.length === this.state.blocks.length){
                const correct = this.props.answer.join(" ");
                const answer = this.state.answer.map(b => b.word).join(" ");
                if(answer === correct){
                    this.setState({ correct: true }, () => {
                        setTimeout(async () => {
                            await this.props.update();
                            this.setState({ 
                                correct: false,
                                answer: [], 
                                blocks: this.props.blocks.mixedFully.map((item, index) => {
                                    return { item, set: false, index }
                                }) 
                            });
                        }, 900);
                    });
                } else {
                    this.setState({ incorrect: true }, () => {
                        setTimeout(() => {
                            //Answer is not correct, clear it
                            this.setState({
                                incorrect: false, 
                                answer: [], 
                                blocks: this.props.blocks.mixedFully.map((item, index) => {
                                    return { item, set: false, index }
                                }) 
                            });
                        }, 900);
                    });
                }
            }
        });
    }
    unsetAnswer = index => {
        const blocks = this.state.blocks;
        blocks[index].set = false;
        this.setState({ blocks, answer: this.state.answer.filter(item => item.index !== index) });
    }
    render(){
        return (
            <div className="sentence-block bg-noun">
                <div className="sentence-block-translation">{this.props.blocks.translation}</div>
                <SentenceBlockAnswer blocks={this.state.answer} correct={this.state.correct} incorrect={this.state.incorrect} unsetAnswer={this.unsetAnswer} />
                <AvailableBlocks blocks={this.state.blocks} setAnswer={this.setAnswer} />
            </div>
        );
    }
}

export default SentenceContent;