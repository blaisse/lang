import { FETCH_NOUN, RESET_NOUN } from './../../actions';

export default function(state=null, action){
    switch(action.type){
        case FETCH_NOUN:
            return action.payload.data;
        case RESET_NOUN:
            return action.payload;
        default:
            return state;
    }
}