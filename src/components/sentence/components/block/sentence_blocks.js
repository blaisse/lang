import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSentenceBlock, clearSentenceBlock, setCorrectAndFetch } from './../../../../actions';
import SentenceContent from './sentence_content';

class SentenceBlocks extends Component {
    constructor(props){
        super(props);
        this.state = { answer: [], correct: false, incorrect: false, words: {} };
    }
    async componentWillMount(){
        await this.props.fetchSentenceBlock('1');
    }
    componentWillUnmount(){
        document.querySelector('.app').classList.remove('bg-noun')
        this.props.clearSentenceBlock();
    }
    componentDidMount(){
        document.querySelector('.app').classList.add('bg-noun');
    }
    update = async () => await this.props.setCorrectAndFetch('sentence');
    render(){ console.log('?', this.props.sentenceBlock);
        if(Object.keys(this.props.sentenceBlock).length === 0) return "";
        return <SentenceContent blocks={this.props.sentenceBlock} answer={this.props.sentenceBlock.slicedFully} update={this.update} />;
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        sentenceBlock: state.sentenceBlock,
        auth: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { fetchSentenceBlock, clearSentenceBlock, setCorrectAndFetch })(SentenceBlocks);