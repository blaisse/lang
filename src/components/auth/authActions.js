import axios from 'axios';

import { SIGNIN_USER, SIGNOUT_USER, AUTH_ERROR, AUTH_CLEAN } from './authTypes';
import { SELECTED_LANGUAGE } from '../settings/languages/languagesTypes';

const ROOT_URL = process.env.REACT_APP_URL;

export function signupUser({ email, password }, obj){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signup`, { email, password }).then(response => {
            //log user in
            dispatch({ type: SIGNIN_USER });
            //save token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('lang', response.data.lang);

            obj.props.history.push('/');
        }).catch((e) => {
            dispatch(authError(e.response.data.error));//from server ex. Email in use
        });
    }
}

export function signinUser({ email, password }, obj){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {

            dispatch({ type: SIGNIN_USER });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('lang', response.data.lang);
            dispatch({ type: SELECTED_LANGUAGE, payload: localStorage.getItem('lang') });
            obj.props.history.push('/');

        }).catch((e) => {
            dispatch(authError('Wrong credentials'));
        }).then(() => {
            // store.dispatch({ type: SELECTED_LANGUAGE, payload: localStorage.getItem('lang') });
        });
    }
}
export function signoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('lang');
    return {
        type: SIGNOUT_USER
    };
}
export function authClean(){
    return {
        type: AUTH_CLEAN
    };
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    };
}