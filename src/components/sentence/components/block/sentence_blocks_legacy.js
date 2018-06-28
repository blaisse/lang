import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSentenceBlock, clearSentenceBlock, setLastCorrect } from './../../../../actions';
import SentenceBlockAnswer from './sentence_blocks_answer';

class SentenceBlocks extends Component {
    constructor(props){
        super(props);
        this.state = { answer: [], correct: false, incorrect: false, words: {} };
    }
    async componentWillMount(){
        await this.props.fetchSentenceBlock(this.props.lang, "1", localStorage.getItem('username'));
        console.log('pls work', this.props.sentenceBlock);   
    }
    componentWillUnmount(){
        this.props.clearSentenceBlock();
    }
    handleBlockClick(event, word, index){
        console.log('--', this.props.sentenceBlock);
        if(this.state.answer.length <= this.props.sentenceBlock.slicedFully.length){
            // this[index].className = "sentence-block-mixed sentence-block-mixed-hide";
            let n = this.state.answer;
            n.push(word);
            let x = this.state.words;
            x[index] = word;
            
            this.setState({ answer: n, words: x }, () => {
                // console.log('i', index, this.state.words);
                if(this.state.words[index]){
                    this[index].className = "sentence-block-mixed sentence-block-mixed-hide";
                }
            
                if(this.state.answer.length === this.props.sentenceBlock.slicedFully.length){
                    let answer = "";
                    this.state.answer.forEach((item) => {
                        answer += item;
                    });
                    let proper = "";
                    this.props.sentenceBlock.slicedFully.forEach((item) => {
                        proper += item;
                    });
                    // console.log('answer string', answer);
                    // console.log('proper string', proper);
                    if(answer === proper){
                        if(this.props.auth){
                            this.props.setLastCorrect('sentence', this.props.sentenceBlock.translation);
                        }
                        this.setState({ ...this.state, correct: true }, () => {
                            setTimeout(() => {
                                const keys = Object.keys(this.state.words);
                                keys.forEach((key) => {
                                    this[key].className = "sentence-block-mixed";
                                });
                                //idk if it always works but seems great right now
                                this.props.clearSentenceBlock();
                                this.setState({ answer: [], correct: false, words: {} }, () => {
                                    this.props.fetchSentenceBlock(this.props.lang, "1", localStorage.getItem('username'));
                                });
                            }, 1000);
                        });
                    } else {
                        //incorrect - clear out but dont fetch a new one
                        this.setState({ ...this.state, incorrect: true }, () => {
                            setTimeout(() => {
                                const keys = Object.keys(this.state.words);
                                keys.forEach((key) => {
                                    this[key].className = "sentence-block-mixed";
                                });
                                this.setState({ answer: [], correct: false, incorrect: false, words: {} });
                            }, 1000);
                        });   
                    }
                }
            });
        }
    }
    updateAnswer(){

    }
    displayBlocks(){
        // const blocks = this.props.sentenceBlock.mixedFully;
        if(this.props.sentenceBlock.hasOwnProperty('mixedFully')){
            return this.props.sentenceBlock.mixedFully.map((word, index) => {
                return (
                    <div ref={(div) => this[index] = div} className="sentence-block-mixed" key={index} onClick={ event => this.handleBlockClick(event, word, index) }>
                        {word}
                    </div>
                );
            });
        }
    }
    render(){     
        console.log('state', this.state);
        return (
            <div className="sentence-block-mixed-container">
                <div className="sentence-block-translation">{this.props.sentenceBlock.translation}</div>
                <SentenceBlockAnswer currentAnswer={this.state.answer} correct={this.state.correct} incorrect={this.state.incorrect} />
                <div className={"sentence-block-mixed-container"}>{this.displayBlocks()}</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        lang: state.lang,
        sentenceBlock: state.sentenceBlock,
        auth: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { fetchSentenceBlock, clearSentenceBlock, setLastCorrect })(SentenceBlocks);