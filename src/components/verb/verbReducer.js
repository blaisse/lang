import { FETCH_VERB, RESET_VERB } from './../../actions'

export default function(state=null, action){
    switch(action.type){
        case FETCH_VERB:
            return action.payload.data;
        case RESET_VERB: 
            return action.payload;
        default:
            return state;
    }
}