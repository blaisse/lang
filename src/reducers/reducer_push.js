import { PUSH_CONTENT } from './../actions'

export default function(state=false, action){
    // console.log('xd', action);
    // console.log('Action', action);
    switch(action.type){
        case PUSH_CONTENT:
            return action.payload;
        default:
            return state;
    }
}