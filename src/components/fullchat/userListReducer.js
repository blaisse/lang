import { SET_USER_LIST } from './chatTypes';

export default function(state=[], action){
    switch(action.type){
        case SET_USER_LIST: 
            return action.payload;
        default:
            return state;
    }
}