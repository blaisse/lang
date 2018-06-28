import { FETCH_FLASHCARD, CLEAR_FLASHCARD } from './flashcardTypes';

export default function(state=null, action){
    switch(action.type){
        case FETCH_FLASHCARD:
            // return [...state, action.payload.data]
            return action.payload.data;
        case CLEAR_FLASHCARD:
            return action.payload; 
        default:
            return state;
    }
}