import { SET_URL } from './chatTypes';

export default function(state=false, action){
    switch(action.type){
        case SET_URL: 
            return action.payload;
        default: 
            return state;
    }
}