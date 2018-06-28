import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashcardSingle from './flashcard_single';
// import HandleSpecial from './../../hoc_special';

class FlashcardCreate extends Component {
    constructor(props){
        super(props);
        this.state = { front: "", back: "" };
    }
    handleFront(value){
        this.setState({ ...this.state, front: value }, () => {
            this.props.getOutput(this.state, this.props.index);
        });
        
    }
    handleBack(value){
        this.setState({ ...this.state, back: value }, () => {
            this.props.getOutput(this.state, this.props.index);
        });
    }
    render(){
        // console.log('front', this.state.front, 'back', this.state.back);
        // const Composed = HandleSpecial(FlashcardSingle);
        return (
            <div className="flashcard-create-area">
                {/* <Composed handleOutput={this.handleFront.bind(this)} lang={this.props.lang} /> */}
                {/* <Composed handleOutput={this.handleFront.bind(this)} /> */}
                <FlashcardSingle handleOutput={this.handleFront.bind(this)} />
                <FlashcardSingle index={this.props.index} handleTab={this.props.handleTab} handleOutput={this.handleBack.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        lang: state.lang
    };
}

export default connect(mapStateToProps)(FlashcardCreate);