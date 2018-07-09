import axios from 'axios';
import { FETCH_WORD, CREATE_VERB, PATCH_VERB, SCRAP_VERB, SCRAP_CLEAR, SCRAP_START, SCRAP_FINISH } from './verbTypes';

const ROOT_URL = process.env.REACT_APP_URL;

export const scrapVerb = verb => async (dispatch, getState) => {
    const { tenses } = getState(); 
    //Scraping german is not enabled
    //Scrap all tenses used in the app
    dispatch(scrapStart());
    const req = await axios.get(`${ROOT_URL}/scrap?verb=${verb}&tenses=${JSON.stringify(tenses['french'])}`);
    dispatch({ type: SCRAP_VERB, payload: req });
    dispatch(scrapFinish());
};

export const scrapStart = () => {
    return { type: SCRAP_START };
}

export const scrapFinish = () => {
    return { type: SCRAP_FINISH };
}

export const clearScrapMessage = () => {
    return {
        type: SCRAP_CLEAR
    };
}
//Used while adding a new verb
export function fetchWord(word, callback){
    const request = axios.get(`${ROOT_URL}/word/${word}`);
    return {
        type: FETCH_WORD,
        payload: request
    };
}

export function createVerb(values){
    const request = axios.post(`${ROOT_URL}/words`, values);
    return {
        type: CREATE_VERB,
        payload: request
    };
}

export function patchVerb(values){
    axios.patch(`${ROOT_URL}/word/${values.word}`, values).then(() => {
        // console.log('Patched successfully');
    });
    return {
        type: PATCH_VERB,
        payload: "patched"
    };
}