import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserFlashcards, clearFlashcardSet } from './../../../actions'; 
import { Link } from 'react-router-dom';

class FlashcardShow extends Component {
    componentWillMount(){ 
        this.props.fetchUserFlashcards(localStorage.getItem('username'));
    }
    componentDidMount(){
        document.querySelector('.app').classList.add('bg-verb');
    }
    componentWillUnmount(){
        document.querySelector('.app').classList.remove('bg-verb')
    }
    handleClick(){}
    displayCards(){
        if(this.props.cards.cards){
            return this.props.cards.cards.map((card, index) => {
                return (
                    <div className="user-flashcard-list-item" key={index}><Link to={`/showflashcard/${card._id}`}>{card.title}</Link></div>
                );
            });
        }
    }
    handleLoad(){
        if(!this.props.cards){
            return <div>Please wait</div>;
        }
    }
    render(){
        return (
            <div className="user-flashcard-list bg-verb">
                {this.handleLoad()}
                {this.displayCards()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        cards: state.userFlashcards,
    };
}

export default connect(mapStateToProps, { fetchUserFlashcards, clearFlashcardSet })(FlashcardShow);