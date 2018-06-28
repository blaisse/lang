import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlashcard, clearFlashcard } from './../flashcardActions';
import Flashcard from './flashcard';

class FlashcardsGrid extends Component {
    constructor(props){
        super(props);
        this.state = { allCorrect: 0, correct: [] };
        this.size = 2;   
    }
    componentDidMount(){
        // let fired = 0;
        // window.addEventListener('scroll', () => {
        //     let scrolled = window.scrollY;//amount scrolled from the very top
        //     let grid_height = document.querySelector('.flashcards-grid').scrollHeight;//total height of the gird
        //     let window_height = window.innerHeight;//always the same..actual browser window height
        //     // console.log('let', document.querySelector('.flashcards-grid').clientHeight, x);
        //     if(scrolled+window_height >= grid_height + 100){//onces it's almost at the end of the div
        //         // console.log('zzzzzzzz', this.state);
        //         if(fired === 0) this.setState({ loading: true, load: false, fired: 1 });
        //         fired++;
        //     }
        // });
    }
    componentWillMount(){
        this.props.fetchFlashcard();
    }
    componentWillUnmount(){
        this.props.clearFlashcard();
    }
    displayFlashcards(){
        if(this.props.flashcards){
            return this.props.flashcards.map((item) => {
                return <Flashcard 
                            key={item.img} 
                            all={this.state.allCorrect} 
                            img={item.img} 
                            english={item.meaning} 
                            article={item.article} 
                            word={item.word} 
                            cor={this.handleCorrect.bind(this)} />;
            }); 
        }
    }
    handleCorrect(card){
        this.setState({ allCorrect: this.state.allCorrect + 1, correct: [...this.state.correct, card] }, () => {
            if(this.state.allCorrect === this.size){
                setTimeout(() => {
                    this.setState({ allCorrect: 0, correct: [] });
                    this.props.clearFlashcard();
                    this.props.fetchFlashcard();
                }, 500);
                
            // this.state.correct.forEach((item) => {
                // item.setState({ hovered: false, showAnswer: false, correct: false });
                // setTimeout(() => item.setState({ hovered: false, showAnswer: false, correct: false }), 300);
            // });
            }
        });
        
    }
    displayMore(){//no use
         if(this.state.loading){
            // console.log('fcards', document.querySelector('.flashcards-grid'));     
            return this.props.flashcards.map((item) => {
                // const Composed = HandleSpecial(Flashcard);
                return (
                    <div className={"flashcards-item"} key={item.img}>
                        {/* <Composed img={item.img} english={item.meaning} article={item.article} word={item.word} /> */}
                          <Flashcard img={item.img} english={item.meaning} article={item.article} word={item.word} />  
                    </div>
                );
            }); 
        }
    }
    handleLoading(){//no use
        if(this.state.loading){
            return (
                <div>Loading..</div>
            );
        }
    }
    handleLoadClick(){
        let l = this.props.lang;
        if(l === null) l = 'german';
        this.props.fetchFlashcard(l);
    }
    displayLoader(){
        if(!this.props.flashcards){
            return <div className="loader"></div>;
        }
    }
    render(){
        // console.log('?', this.props.flashcards);
        return (
            <div className="flashcards">
                {this.displayLoader()}
                <p className="flashcards-p">Click on the card to check the answer</p>
                <div className="flashcards-grid">
                    {this.displayFlashcards()} 
                    {/* {this.displayMore()}     */}
                </div>
                {/* {this.handleLoading()} */}
                {/* <p onClick={this.handleLoadClick.bind(this)}>Load more</p> */}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        flashcards: state.flashcards,
    };
}

export default connect(mapStateToProps, { fetchFlashcard, clearFlashcard })(FlashcardsGrid);