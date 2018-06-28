import { combineReducers } from 'redux';
import VerbsReducer from '../components/verb/verbReducer';
import NounReducer from '../components/noun/nounReducer';

import authReducer from '../components/auth/authReducer';

import TenseReducer from './../components/settings/tenses/tenseReducer';
import TensesReducer from './../components/settings/tenses/tensesReducer';

import PushReducer from './reducer_push';

import LanguagesReducer from '../components/settings/languages/languagesReducer';
import LangReducer from '../components/settings/languages/languageReducer';

import FlashcardReducer from '../components/flashcard/flashcardReducer';
import { reducer as formReducer } from 'redux-form';
import chatReducer from '../components/chat/chatReducer';
import pluralReducer from '../components/plural/pluralReducer';
import userFlashcards from '../components/flashcardUser/flashcardsUserReducer';
import sentenceBlock from '../components/sentence/sentenceReducer';
import UrlReducer from '../components/fullchat/reducer_url';

//Full chat - refactor
import FullCharReducer from '../components/fullchat/chatReducer';
import PrivateMessagesReducer from '../components/fullchat/privateMessagesReducer';
import GlobalMessagesReducer from '../components/fullchat/globalMessagesReducer';
import UserListReducer from '../components/fullchat/userListReducer';

import DataReducer from './data_reducer';

const rootReducer = combineReducers({
  data: DataReducer,
  verb: VerbsReducer,
  tenses: TensesReducer,
  selectedTenses: TenseReducer,
  form: formReducer,
  pushContent: PushReducer,
  languages: LanguagesReducer,
  lang: LangReducer,
  noun: NounReducer,
  flashcards: FlashcardReducer,
  userFlashcards: userFlashcards,
  auth: authReducer,
  chat: chatReducer,
  plural: pluralReducer,
  sentenceBlock,
  url: UrlReducer,
  privateMessages: PrivateMessagesReducer,
  userList: UserListReducer,
  fullChat: FullCharReducer,
  global_messages: GlobalMessagesReducer
});

export default rootReducer;
