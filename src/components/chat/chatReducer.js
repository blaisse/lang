import { EXPAND_CHAT, HIDE_CHAT } from './../../actions';

export default function(state={}, action){
    switch(action.type){
        case EXPAND_CHAT:
            return { ...state, expanded: true };
        case HIDE_CHAT:
            return { ...state, expanded: false };
        default:
            return state;
    }
}