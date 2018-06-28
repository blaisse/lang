import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tense from './tense';
import { selectTense } from './../../tensesActions';

const actions = {
    selectTense
};

class ChangeTense extends Component {
    state = {
        clicked: false,
        tenses: this.props.selectedTenses.length ? this.props.selectedTenses : this.props.tenses[this.props.lang]
    }
    displayTenses(){
        if(this.state.clicked){
            //use all tenses
            return this.props.tenses[this.props.lang].map((tense, i) => {
                const selected = this.state.tenses.filter(item => item === tense).length;
                return <Tense selected={selected} tense={tense} clickTense={this.clickTense} key={i} />
            });
        }
        return;
    }
    displaySubmitButton(){
        if(this.state.clicked){
            return <div onClick={this.handleSubmit} className="change-tense-submit">Submit</div>;
        }
    }
    handleSubmit = () => {
        //Unable submitting tenses if there are no changes?
        //User might have selected tenses in different order than those stored in state even though they are the same

        // if(this.state.tenses.length === this.tenses.length){
        //     const hmm = this.state.tenses.every((tense, i) => {
        //         console.log('the same');
        //         return tense === this.tenses[i];
        //     });
        //     console.log('hmm', hmm);
        // }
        this.setState({ 
            clicked: false
        }, () => this.props.selectTense(this.state.tenses));
    }
    handleClick = () => {
        this.setState({ 
            clicked: !this.state.clicked,
            tenses: this.props.selectedTenses.length ? this.props.selectedTenses : this.props.tenses[this.props.lang]
         });
    }
    clickTense = (tense, clicked) => {
        if(clicked){
            this.setState({ tenses: [...this.state.tenses, tense] });
        } else {
            this.setState({ tenses: this.state.tenses.filter(item => item !== tense) });
        }
    }
    render(){
        // console.log('this.tenses', this.tenses);
        // console.log('TENSES', this.props.selectedTenses);
        return (
            <div className={`change-tense ${this.state.clicked ? 'change-tense-clicked' : ''}`}>
                <p className="change-tense-button" onClick={this.handleClick}>Change tense</p>
                {this.displayTenses()}
                {this.displaySubmitButton()}
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        tenses: state.tenses,
        selectedTenses: state.selectedTenses,
        lang: state.lang
    };
}

export default connect(mapState, actions)(ChangeTense);