import axios from 'axios';

export const FETCH_VERB = 'fetch_verb';
export const RESET_VERB = 'reset_verb';
export const PUSH_CONTENT = 'push_content';
export const FETCH_NOUN = 'fetch_noun';
export const RESET_NOUN = 'reset_noun';
export const ADD_NOUN = 'add_noun';
export const GET_NOUN = 'get_noun';
export const FETCH_PLURAL = 'fetch_plural';
export const SAVE_FLASHCARD = 'save_flashcard';
export const FETCH_USER_FLASHCARDS = 'fetch_user_flashcards';
export const CLEAR_USER_FLASHCARD = 'clear_user_flashcard';
export const FETCH_SINGLE_USER_FLASHCARD = 'fetch_single_user_flashcard';
export const FETCH_SENTENCE_BLOCK = 'fetch_sentence_block';
export const CLEAR_SENTENCE_BLOCK = 'clear_sentence_block';

export const EXPAND_CHAT = 'expand_chat';
export const HIDE_CHAT = 'hide_chat';
export const PRIVATE_CHAT = 'private_chat';

// const ROOT_URL = 'http://localhost:3007';
const ROOT_URL = process.env.REACT_APP_URL;

export function addPrivate(room, message){

}

export function expandChat(){
    return {
        type: EXPAND_CHAT
    };
}

export const fetchNoun = () => async (dispatch, getState) => {
    const { lang } = getState();
    const user = localStorage.getItem('username');
    let request;
    if(user){
        request = axios.get(`${ROOT_URL}/userfetchnoun/${lang}/${user}`);
    } else {
        request = await axios.post(`${ROOT_URL}/fetch`, { lang });
    }
    dispatch({ type: FETCH_NOUN, payload: request });
}
export const fetchSentenceBlock = level => async (dispatch, getState) => {
    const { lang } = getState();
    const user = localStorage.getItem('username');
    const request = await axios.get(`${ROOT_URL}/fetchsentence/${lang}/${level}/${user}`);
    dispatch({ type: FETCH_SENTENCE_BLOCK, payload: request });
}
export const fetchPlural = () => (dispatch, getState) => {
    const { lang } = getState();
    const user = localStorage.getItem('username');
    const request = axios.get(`${ROOT_URL}/plural/${lang}/${user}`);
    dispatch({ type: FETCH_PLURAL, payload: request });
}

export const setCorrectAndFetch = type => async (dispatch, getState) => {
    //type => String: "verb", "noun"
    let correct;
    if(type === 'verb' || type === 'noun' || type === 'plural'){
        correct = getState()[type].word;
    } else if(type === 'sentence'){
        correct = getState().sentenceBlock.id;
    }
    await axios.post(`${ROOT_URL}/setlastcorrect/${type}/${correct}`, {},  {
        headers: { authorization: localStorage.getItem('token') }
    });
    //Choose which action to execute based on provided type
    switch(type){
        case 'verb':
            return dispatch(fetchVerb());
        case 'noun':
            return dispatch(fetchNoun());
        case 'plural':
            return dispatch(fetchPlural());
        case 'sentence':
            return dispatch(fetchSentenceBlock("1"));
        default:
            return dispatch({ type: "ERROR_WHILE_FETCHING" });
    }
}
export const fetchVerb = () => async (dispatch, getState) => {
    const { lang, selectedTenses, tenses } = getState();
    const user = localStorage.getItem('username');
   //WHY AM I USING POST FOR FETCHING? zz
    //All tenses for a given language by default
    const usedTenses = selectedTenses.length ? selectedTenses : tenses[lang];
    const randomTense = Math.floor(Math.random() * usedTenses.length);
    const requestData = {
        time: usedTenses[randomTense],
        lang,
        user 
    };
    const request = await axios.post(`${ROOT_URL}/word`, requestData);
    dispatch({ type: FETCH_VERB, payload: request });
}
export const setLastCorrect = (type, correct) => {
    //Sentences - mongodb didn't save question marks. The code in unused now. Compares ids instead of translations.
    if(correct[correct.length-1] === "?"){
        correct = correct.slice(0, correct.length-1);
        correct += "%3F";
    }
    // const request = axios.post(`${ROOT_URL}/setlastcorrect/${type}/${correct}`, {},  {
    //         headers: { authorization: localStorage.getItem('token') }
    // });
    return {
        type: "setLastCorrect"
    };
    
}

export function hideChat(){
    return {
        type: HIDE_CHAT
    };
}



export function resetVerb(){
    return {
        type: RESET_VERB,
        payload: null
    };
}



export function pushContent(state){
    return {
        type: PUSH_CONTENT,
        payload: state
    };
}
//NOUN

export function addNoun(data){
    const request = axios.post(`${ROOT_URL}/noun`, data);
    return {
        type: ADD_NOUN,
        payload: request
    };
}
export function resetNoun(){
    return {
        type: RESET_NOUN,
        payload: {}
    };
}
export function getNoun(name){
    const request = axios.get(`${ROOT_URL}/noun/${name}`);
    return {
        type: GET_NOUN,
        payload: request
    };
}
export function saveFlashcardSet(data, callback){
    // console.log('data', data, owner, title);
    // console.log('callback', callback);
    // console.log('c2', callback());
    const request = axios.post(`${ROOT_URL}/savecard`, {data: data.ar, owner: data.owner, title: data.title}).then(() => callback());
    console.log('rr', request);
    return {
        type: SAVE_FLASHCARD,
        payload: request
    };
}

export function clearFlashcardSet(){
    return {
        type: CLEAR_USER_FLASHCARD,
        payload: []
    };
}
export function fetchUserFlashcards(user){
    // console.log('u', user);
    return function(dispatch){
        axios.get(`${ROOT_URL}/getcard/${user}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then((response) => {
            // console.log('r', response);
            dispatch({ type: FETCH_USER_FLASHCARDS, payload: response.data });
        });
    }
}

export function fetchSingleFlashcard(id){
    const request = axios.get(`${ROOT_URL}/getsinglecard/${id}`);
    return {
        type: FETCH_SINGLE_USER_FLASHCARD,
        payload: request
    };
}


export function clearSentenceBlock(){
    return {
        type: CLEAR_SENTENCE_BLOCK,
        payload: {}
    };
}

export function saveSentence(values){
    const request = axios.post(`${ROOT_URL}/savesentence`, {values});
    return {
        type: "saveSentence",
        payload: request
    };
}
