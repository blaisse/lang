import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from "./store/configureStore";

import registerServiceWorker from './registerServiceWorker';

import { SELECTED_LANGUAGE } from './components/settings/languages/languagesTypes';
import { SIGNIN_USER } from './components/auth/authTypes';

const store = configureStore();

//dispatch logging in etc.
const token = localStorage.getItem('token');
const language = localStorage.getItem('lang');

if(token) store.dispatch({ type: SIGNIN_USER });
if(language){
    store.dispatch({ type: SELECTED_LANGUAGE, payload: localStorage.getItem('lang') });
} else {
    localStorage.setItem('lang', 'french');
    store.dispatch({ type: SELECTED_LANGUAGE, payload: localStorage.getItem('lang') });
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
