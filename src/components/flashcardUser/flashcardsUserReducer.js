import { FETCH_USER_FLASHCARDS, FETCH_SINGLE_USER_FLASHCARD, CLEAR_USER_FLASHCARD } from './../../actions'; 

export default function(state={}, action){
    switch(action.type){
      case FETCH_USER_FLASHCARDS:
        return { ...state, cards: action.payload };//array
      case FETCH_SINGLE_USER_FLASHCARD:
        return { ...state, card: action.payload.data };
      case CLEAR_USER_FLASHCARD:
        return { ...state, cards: action.payload };
      default:
        return state;
    }
}