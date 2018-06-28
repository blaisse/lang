import { SELECTED_LANGUAGE } from './languagesTypes';

export default function(state=null, action){
    switch(action.type){
        case SELECTED_LANGUAGE:
            return action.payload;
        default: 
            return state;
    }
}