import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AddVerb from './components/verb/components/add_verb';
import CorrectVerb from './components/verb/components/correct_verb';

import AddNoun from './components/noun/components/add_noun';
import DisplayNoun from './components/noun/components/display_noun';

import SignUp from './components/auth/components/signup'; 
import SignIn from './components/auth/components/signin';
import SignOut from './components/auth/components/signout';
import RequireAuth from './components/auth/components/require_auth';

import DisplayTimes from './components/settings/tenses/components/display_times';
import DisplayLanguages from './components/settings/languages/components/display_languages';

import AddSentence from './components/sentence/components/block/add_sentence';
import SentenceBlocks from './components/sentence/components/block/sentence_blocks';

import FlashcardsGrid from './components/flashcard/components/flashcards_grid';

import Menu from './components/nav/menu';

import Chat from './components/chat/chat';
import ChatFull from './components/fullchat/components/chat';
import Notifications from './components/fullchat/components/notifications/notifications';

import Plural from './components/plural/components/plural';
import FlashcardContainer from './components/flashcardUser/create/flashcard_container';
import FlashcardShow from './components/flashcardUser/display/flashcard_show';
import FlashcardShowOne from './components/flashcardUser/display/flashcard_show_one';


import Panel from './components/panel/Panel';
// import Tutorial from './components/tutorial/tutorial';

import HandleSpecial from './components/hoc_special';

class App extends Component {
  handleKey = event => {
    if(event.keyCode === 27){
      const menu = document.querySelector('.menu-icon');
      if(menu) menu.click();
    }
    if(event.keyCode === 113){
      const chat = document.querySelector('.chat-click');
      if(chat) chat.click();
    }
    if(event.keyCode === 115 && localStorage.getItem('token')){
      const panel = document.querySelector('.panel-click');
      if(panel) panel.click();
    }
  }
  focusDiv = () => {
    const d = document.querySelector('.app');
    d.focus();
  }
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}> 
        <div tabIndex="0" className="app" onKeyDown={this.handleKey} onLoad={this.focusDiv}>
          <Menu />
          <Notifications />
          <div className={"push-container " + (this.props.push ? 'app-push' : '')}>
            <Switch>
              <Route exact path="/" component={DisplayLanguages} />
              <Route exact path="/tenses" component={DisplayTimes} />
              <Route exact path="/verb" component={CorrectVerb} />
              <Route exact path="/add" component={HandleSpecial(RequireAuth(AddVerb))} />
              <Route exact path ="/addnoun" component={HandleSpecial(RequireAuth(AddNoun))} />
              <Route exact path="/noun" component={DisplayNoun} />
              <Route exact path="/flashcards" component={FlashcardsGrid} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signout" component={SignOut} />
              <Route exact path="/plural" component={Plural} />
              <Route exact path="/createflashcard" component={RequireAuth(FlashcardContainer)} />
              <Route exact path="/showflashcards" component={RequireAuth(FlashcardShow)} />
              <Route exact path="/showflashcard/:id" component={FlashcardShowOne} />
              <Route exact path="/blocks" component={SentenceBlocks} />
              <Route exact path="/chat" component={ChatFull} />
              <Route exact path="/addsentence" component={HandleSpecial(RequireAuth(AddSentence))} />
              <Route exact path="/panel" component={RequireAuth(Panel)} />
              {/* <Route exact path="/write" component={RequireAuth(Tutorial)} /> */}
            </Switch>
          </div>
          <Chat />
        </div>
    </BrowserRouter>
    );
  }
}

const stateMap = state => {
  return {
    push: state.pushContent
  };
}

export default connect(stateMap)(App);
