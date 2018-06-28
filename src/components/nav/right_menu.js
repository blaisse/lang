import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class RightMenu extends Component {
    renderLinks(){
        if(this.props.authenticated){
            return [
                <Link onClick={() => this.props.closeMenu()} to="/addnoun" key="1">Add Noun</Link>,
                <Link onClick={() => this.props.closeMenu()} to="/add" key="2">Add Verb</Link>,
                <Link onClick={() => this.props.closeMenu()} to="/addsentence" key="3">Add Sentence</Link>,
                <Link onClick={() => this.props.closeMenu()} to="/createflashcard" key="4">Create Flashcard Set</Link>, 
                <Link onClick={() => this.props.closeMenu()} to="/showflashcards" key="5">Show Flashcards</Link>
            ];
        } else {
            return <div>Sign in to see the content</div>;
        }
    }
    render(){
        return (
            <div className={"right-menu " + (this.props.open ? 'right-menu-open' : '') }>
                <div className="right-menu-links">
                    <p>Use ESC to open/close menu</p>
                     {this.renderLinks()}    
                </div>
                   {/* <img src="https://i.giphy.com/media/ntmBgj2X9FLGM/giphy.webp" alt=""/>   */}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(RightMenu);