import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNoun, resetNoun, setCorrectAndFetch } from './../../../actions';
import InputNoun from './input_noun';
import HandleSpecial from './../../hoc_special';

class DisplayNoun extends Component {
    state = { correct: "3" };
    componentWillMount(){
        this.props.fetchNoun();
    }
    componentDidMount(){
        // document.querySelector('.app').classList.add('bg-noun');
    }
    componentWillUnmount(){
        // document.querySelector('.app').classList.remove('bg-noun');
        this.props.resetNoun();
    }
    handleNoun = (article, word) => {
        if(word.trim() === this.props.noun.word && article.trim() === this.props.noun.article){
            this.setState({ correct: "1" });
            setTimeout(() => {
                this.props.setCorrectAndFetch('noun');
                this.setState({ correct: "3" });
            }, 400);
            
        } else {
            //Incorrect answer - clear
            this.setState({ correct: "2" }, () => {
                setTimeout(() => {
                    this.setState({ correct: "3" });
                }, 500);
            });
        }
    }
    displayContent(){
        if(!this.props.noun) return <div className="loader"></div>;
        const Compund = HandleSpecial(InputNoun);
        return (
            <div className="card-container bg-noun">
                <div className="card-content">
                    <div className="noun-meaning">{this.props.noun.meaning}</div>
                    <Compund 
                        sendInput={this.handleNoun} 
                        correct={this.state.correct} 
                        article={this.props.noun.article} 
                        noun={this.props.noun.word} />
                    <div className="hint-plural">Press the right keyboard arrow to see the answer</div>
                </div>
            </div> 
        );
    }
    render = () => this.displayContent();
}
const mapStateToProps = state => {
    return {
        noun: state.noun
    };
}

export default connect(mapStateToProps, { fetchNoun, resetNoun, setCorrectAndFetch })(DisplayNoun);