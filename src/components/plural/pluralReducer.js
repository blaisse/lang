import { FETCH_PLURAL } from './../../actions';

export default function(state=null, action){
    switch(action.type){
        case FETCH_PLURAL:
            return action.payload.data;
        default: 
            return state;
    }
}