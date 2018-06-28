import { SIGNIN_USER, AUTH_ERROR, AUTH_CLEAN, SIGNOUT_USER } from './authTypes';

export default function(state={}, action){
    switch(action.type){
        case SIGNIN_USER:
            return { ...state, authenticated: true };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case AUTH_CLEAN:
            return { ...state, error: '' };
        case SIGNOUT_USER:
            return { ...state, authenticated: false };
        default: 
            return state;
    }
}