import { FETCH_SENTENCE_BLOCK, CLEAR_SENTENCE_BLOCK } from './../../actions';

export default function(state={}, action){
    switch(action.type){
        case FETCH_SENTENCE_BLOCK:
            return action.payload.data;
        case CLEAR_SENTENCE_BLOCK:
            return action.payload;
        default:
            return state;
    }
}