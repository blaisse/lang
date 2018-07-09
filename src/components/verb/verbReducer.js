import { FETCH_VERB, RESET_VERB } from './../../actions'
import { SCRAP_VERB, SCRAP_CLEAR, SCRAP_START, SCRAP_FINISH } from './verbTypes';

export default function(state={ verb: '', scrapMessage: '', loading: false }, action){
    switch(action.type){
        case FETCH_VERB:
            return { ...state, verb: action.payload.data };
        case RESET_VERB: 
            return { verb: '', scrapMessage: '' };
        case SCRAP_VERB: 
            return { ...state, scrapMessage: action.payload.data };
        case SCRAP_START: 
            return { ...state, loading: true };
        case SCRAP_FINISH: 
            return { ...state, loading: false };
        case SCRAP_CLEAR:
            return { verb: '', scrapMessage: '' };
        default:
            return state;
    }
}