import axios from 'axios';
import { SELECTED_LANGUAGE } from './languagesTypes';

const ROOT_URL = process.env.REACT_APP_URL;

export function selectLanguage(lang){
    //make a call to server and save the selected language
    //store it in a token, if lang is not there, only then read from DB
    localStorage.setItem('lang', lang);
    const token = localStorage.getItem('username');
    if(token){
        const send = {
            username: token,
            lang
        };
        axios.post(`${ROOT_URL}/setlang`, send);
    }
    return {
        type: SELECTED_LANGUAGE,
        payload: lang
    };
}