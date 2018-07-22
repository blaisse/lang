import { FETCH_MATCH_SET } from './matchTypes';

export default (state=[], action) => {
    switch(action.type){
        case FETCH_MATCH_SET:
            return action.payload.data;
        default:
            return state;
    }
}