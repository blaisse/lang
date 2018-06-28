import axios from 'axios';
import { FETCH_FLASHCARD, CLEAR_FLASHCARD } from './flashcardTypes';

const ROOT_URL = process.env.REACT_APP_URL;

export const fetchFlashcard = () => (dispatch, getState) => {
    const { lang } = getState();
    const request = axios.post(`${ROOT_URL}/fetchflashcard`, { lang });
    dispatch({ type: FETCH_FLASHCARD, payload: request });
}
export function clearFlashcard(){
    return {
        type: CLEAR_FLASHCARD,
        payload: null
    };
}