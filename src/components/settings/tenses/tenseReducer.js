import { SELECTED_TENSE } from './tensesTypes';

//Default: tenses from other reducer, how?
export default function(state=[], action){
    switch(action.type){
        case SELECTED_TENSE:
            return action.payload;
        default:
            return state;
    }
}