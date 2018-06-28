import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTense } from './../tensesActions';
import { Link } from 'react-router-dom';
import ClickTense from './click_tense';

class DisplayTimes extends Component { 
    constructor(props){
        super(props);
        this.state = { tense: [] };
    }
    componentDidMount(){
        document.querySelector('.app').classList.add('bg-tenses');
    }
    componentWillUnmount(){
        document.querySelector('.app').classList.remove('bg-tenses');
    }
    renderTimes(){
        const properTenses = this.props.tenses[this.props.lang] || this.props.tenses['french'];
        // console.log('tenses based on language', properTenses);
        return properTenses.map((tense) => {
            return (
                <li 
                    className="tense-link-li"
                    key={tense} > 
                   <ClickTense tense={tense} sendState={this.checkClick.bind(this)} />
                </li>
            );
        });
    }
    checkClick(clickedTenseState, tense){ 
        //If tense has been selected add it to state array, else remove it (unselected)
        if(clickedTenseState) this.setState({ tense: [ ...this.state.tense, tense ] });
        else this.setState({ tense: this.state.tense.filter(item => item !== tense) });
    }
    handleLink(){
        if(this.state.tense.length === 0){
            return <p className="tenses-select-more">Please select at least one tense </p>;
        } else {
            return (
                <div className="practice-link" onClick={() => this.props.selectTense(this.state.tense)}>
                    <Link className="tenses-submit" to='/verb'>Click to Practise</Link>
                </div>
            );
        }
    }
    render(){
        return (
            <div className="tenses">
                <p className="tenses-header">Select tenses to practise</p>
                <ul className="tense-ul">
                    <li className="tense-link-li">
                        <Link className="tense-link-li" to='/verb' onClick={() => this.props.selectTense(this.props.tenses[this.props.lang])}>
                            <div className="tense-link all-tenses">all tenses</div>
                        </Link>
                    </li>
                    {this.renderTimes()}
                </ul>
                {this.handleLink()}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        tenses: state.tenses,
        lang: state.lang,
    };
}

export default connect(mapStateToProps, { selectTense })(DisplayTimes);