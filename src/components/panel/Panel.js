import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from './Search';

class Panel extends Component {
    constructor(props){
        super(props);
        this.state = { display: "" };
        this.links = [
            {to: "/addnoun", text: "Add Noun"},
            {to: "/add", text: "Add Verb"},
            {to: "/addsentence", text: "Add Sentence"},
            {to: "/createflashcard", text: "Create Flashcard Set"},
            {to: "/showflashcards", text: "Show Flashcards"}
        ];
        this.getSearchInput = this.getSearchInput.bind(this);
    }
    componentDidMount(){
        document.querySelector('.app').classList.add('bg-verb');
    }
    componentWillUnmount(){
        document.querySelector('.app').classList.remove('bg-verb')
    }
    renderSearch(){
        return <Search sendInput={this.getSearchInput} />;
    }
    getSearchInput(input){
        this.setState({ display: input });
    }
    renderLinks(){
        if(this.state.display.length === 0){
            return this.links.map((link, i) => {
                return <Link to={link.to} key={i}>{link.text}</Link> 
            });
        } else {
            const noSpaceState = this.state.display.replace(" ", "").toLowerCase();
            return this.links.map((link, i) => {
                if(
                    link.text.toLowerCase().includes(this.state.display.toLowerCase()) ||
                    link.text.toLowerCase().replace(" ", "").includes(noSpaceState) ||
                    link.text.toLowerCase().replace(" ", "").includes(this.state.display)
                ){
                    return <Link to={link.to} key={i}>{link.text}</Link>
                } else return "";
            });
        }
    }
    renderLinks2(){
        return [
            <Link to="/addnoun" key="1">Add Noun</Link>,
            <Link to="/add" key="2">Add Verb</Link>,
            <Link to="/addsentence" key="3">Add Sentence</Link>,
            <Link to="/createflashcard" key="4">Create Flashcard Set</Link>, 
            <Link to="/showflashcards" key="5">Show Flashcards</Link>   ,
            <Link to="/addnoun" key="6">Add Noun</Link>,
            <Link to="/add" key="7">Add Verb</Link>,
            <Link to="/addsentence" key="63">Add Sentence</Link>,
            <Link to="/createflashcard" key="74">Create Flashcard Set</Link>, 
            <Link to="/showflashcards" key="57">Show Flashcards</Link>
        ];
    }
    render(){
        return (
            <div className="panel bg-verb">
                <div className="panel-search">{this.renderSearch()}</div>
                <div className="panel-links">{this.renderLinks()}</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Panel);