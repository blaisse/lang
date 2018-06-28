import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVerb, resetVerb, setLastCorrect, setCorrectAndFetch } from './../../../actions';
// import { selectTense } from './../../settings/tenses/tensesActions';
import InputVerb from './input_verb';
import HandleSpecial from './../../hoc_special';
// import SpecialCharacters from './../../special_characters';
import ChangeTense from './../../settings/tenses/components/change_tense/change_tense';

const actions = {
    setCorrectAndFetch,
    fetchVerb,
    resetVerb,
    setLastCorrect
};

class CorrectVerb extends Component {
    state = { pronoun: null, picked: null, character: null };
    async componentWillMount(){
        await this.props.fetchVerb();
        if(this.props.verb){
            this.randomPronoun();
        }
    }
    async componentWillReceiveProps(nextProps){
        if(nextProps.selectedTenses !== this.props.selectedTenses){
            await this.props.fetchVerb();
            if(this.props.verb){
                this.randomPronoun();
            }
        }
    }
    componentDidMount(){
        document.querySelector('.app').classList.add('bg-verb');
    }
    componentWillUnmount(){
        document.querySelector('.app').classList.remove('bg-verb')
        this.props.resetVerb();
    }
    randomPronoun(){
        //This code needs help
        const pronouns = this.props.pronouns['french'];//this.props.lang
        const rand = Math.floor(Math.random()*pronouns.length);
        let pronoun = pronouns[rand];
        const picked = this.props.verb.tenses[0].conjugation[pronoun.word];//Doesn't work for German
        if(this.props.lang === 'german') pronoun = this.props.pronouns['german'][rand];
        this.setState({ pronoun, picked });
    }
    displaySub(){
        if(this.state.pronoun){
            return <div className="input-person">{this.state.pronoun.word}</div>;
        }
    }
    async inputAnswer(answer){
        if(this.state.picked && this.state.picked === answer){
            if(this.props.auth) {
                await this.props.setCorrectAndFetch('verb', this.props.verb.word);
                this.randomPronoun();
            } else {
                await this.props.fetchVerb();
                this.randomPronoun();
            }
        }
    }
    handleRefresh = async () => {
        await this.props.fetchVerb();
        if(this.props.verb) this.randomPronoun();
    }
    handleCharacterClick = (id) => {
        const character = document.querySelector(id).textContent;
        this.setState({ character });
    }
    resetCharacter = () => {
        this.setState({ character: null });
    }
    render(){
        const Composed = HandleSpecial(InputVerb);
        if(!this.props.verb) return <div className="loader"></div>;
        return (
            <div className="card-container bg-verb">
                <div className="card-change"><ChangeTense /></div>
                <div className="card-content">
                    <p className="verb-tense">{this.props.verb.tenses[0].tense}</p>
                    <span className="refresh-icon" onClick={this.handleRefresh}><i className="fal fa-redo"></i></span>
                    <span className="verb-inner-meaning">{this.props.verb.meaning}</span>
                    <div className={"input-field"}>
                        <Composed 
                            // character={this.state.character} 
                            // resetCharacter={this.resetCharacter} 
                            pronoun={this.state.pronoun}
                            picked={this.state.picked} 
                            onAnswerChange={this.inputAnswer.bind(this)} />
                    </div>  
                </div>
            </div>
        );  
    }
}

const mapStateToProps = state => {
    return { 
        pronouns: state.data.pronouns.subject,
        selectedTenses: state.selectedTenses,
        verb: state.verb,
        lang: state.lang,
        auth: state.auth.authenticated
    };
}

export default connect(mapStateToProps, actions)(CorrectVerb);