import axios from 'axios';
import { FETCH_WORD, CREATE_VERB, PATCH_VERB } from './verbTypes';

const ROOT_URL = process.env.REACT_APP_URL;

//Used in while adding a new verb
export function fetchWord(word, callback){
    const request = axios.get(`${ROOT_URL}/word/${word}`);
    return {
        type: FETCH_WORD,
        payload: request
    };
}

export function createVerb(values){
    // console.log(values);
    const request = axios.post(`${ROOT_URL}/words`, values);
    return {
        type: CREATE_VERB,
        payload: request
    };
}

export function patchVerb(values){
    axios.patch(`${ROOT_URL}/word/${values.word}`, values).then(() => {
        console.log('Patched successfully');
    });
    return {
        type: PATCH_VERB,
        payload: "patched"
    };
}