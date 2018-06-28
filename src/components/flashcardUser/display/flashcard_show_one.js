import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleFlashcard } from './../../../actions';

class FlashcardShowOne extends Component {
    constructor(props){
        super(props);
        this.state = { index: 0, displayed: "front" }
    }
    componentWillMount(){
        const { id } = this.props.match.params;
        this.props.fetchSingleFlashcard(id);
    }
    componentDidMount(){
        this.mainDiv.focus();
    }
    displayContent(){
        if(this.props.card){
            const { card } = this.props;
            const { cards } = this.props.card;
            return (
                <div>
                    <div className="user-flashcard-title">{card.title}</div>
                    <div className="user-flashcard-author">Created by: {card.owner.email}</div>
                    <div className="user-flashcard-desc">Use up/down arrow keys to flip the card and left/right to go to the next one.</div>
                    <div className="user-flashcard">{cards[this.state.index][this.state.displayed]}</div>
                </div>
            );
        }
    }
    handleKeys(e){
        if(e.keyCode === 38 && this.state.displayed !== 'back'){//up
            return this.setState({ ...this.state, displayed: 'back' });
        }
        if(e.keyCode === 40 && this.state.displayed !== 'front'){//down
            return this.setState({ ...this.state, displayed: 'front' });
        }
        if(e.keyCode === 39 && this.state.index+1 < this.props.card.cards.length){
            const i = this.state.index + 1;
            return this.setState({ ...this.state, index: i});
        }
        if(e.keyCode === 37 && this.state.index-1 >= 0){
            const i = this.state.index - 1;
            return this.setState({ ...this.state, index: i });
        }

    }
    render(){
        return (
            //tabIndex so that keyDown works on a div
            <div className="user-flashcard-display bg-verb" ref={(div) => this.mainDiv = div} onKeyDown={this.handleKeys.bind(this)} tabIndex="0" >
                <div className="user-flashcard-display-content">{this.displayContent()}</div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        card: state.userFlashcards.card
    };
}

export default connect(mapStateToProps, { fetchSingleFlashcard })(FlashcardShowOne);