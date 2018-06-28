import React, { Component } from 'react';
import InputFlashcard from './input_flashcard';
import HandleSpecial from './../../hoc_special';

class Flashcard extends Component {
    constructor(props){
        super(props);
        this.state = { hovered: false, showAnswer: false, correct: false };
    }
    handleGuess(guess){
        const answer = `${this.props.article} ${this.props.word}`;
        if(guess === answer){
            this.setState({ hovered: false, showAnswer: false, correct: true }, () => {
                this.props.cor(this);
            });
        }
    }
    showInput(){
        if(this.state.hovered){
            const Composed = HandleSpecial(InputFlashcard);
            return (
                <div className="flashcard"
                     onMouseLeave={() => this.hoverStateOff()}
                     onClick={() => this.handleImgClick()}>
                     <div>
                         {/* <input type="text" autoFocus={true} />  */}
                          {/* <InputFlashcard handleGuess={this.handleGuess.bind(this)} />   */}
                          <Composed handleGuess={this.handleGuess.bind(this)} /> 
                     </div>
                </div>
            );
        }
    }
    hoverState(){
        this.setState({ hovered: true, showAnswer: false }, () => {
        });
    }
    hoverStateOff(){
        document.querySelector('.app').focus();
        this.setState({ hovered: false, showAnswer: false });
    }
    handleImgClick(){
        this.setState({ hovered: false, showAnswer: true }, () => {
     
        });
    }
    showAnswer(){
        if(this.state.showAnswer){
            return (
                <div className="flashcard flashcard-visible"
                    onClick={() => this.hoverStateOff()}
                    onMouseLeave={() => this.hoverStateOff()}>
                    <p className="flashcard-answer">{this.props.article} {this.props.word}</p>
                </div>
            );
        }
    }
    correct(){
        if(this.state.correct){
            document.querySelector('.app').focus();
            return (
                <div className="flashcard-correct">
                    <p>Correct!</p>
                </div>
            );
        }
    }
    // onMouseLeave={() => this.hoverStateOff()} 
    render(){
        const Composed = HandleSpecial(InputFlashcard);
        return (
            <div className={'flashcards-item ' + (this.state.correct ? 'flashcards-item-correct' : '')}>
                <div className="flashcards-item-inner">
                    {/* {this.showInput()} */}
                    {this.showAnswer()}
                    {/* {this.correct()} */}
                    <img src={this.props.img}
                        alt="flashcard"
                        onMouseEnter={() => this.hoverState()}
                        onClick={() => this.handleImgClick()}
                    />
                </div>
                <p className={"flashcard-english " + (this.state.correct ? 'flashcard-english-correct' : '')}>{this.props.english}</p>
                <div className="flashcard-input"><Composed handleGuess={this.handleGuess.bind(this)} /></div> 
            </div>
        );
    }
}

export default Flashcard;