import { SET_PRIVATE_MESSAGES } from './chatTypes';

export default function(state=[], action){
    
    switch(action.type){
        case SET_PRIVATE_MESSAGES: 
        //not used!
        // if(action.payload.chat === false){
        //     // console.log('has CHATY', action.payload.m);
        //     let updated = state.map((item) => {
        //         if(item.channel === action.payload.m.channel){
        //             return action.payload.m;
        //         }
     
        //         return item;
        //     });
        //     return updated;
        // }
        let updated = state.map((item) => {
            if(item.channel === action.payload.channel){
                return action.payload;
            }
 
            return item;
        });
        
        let res = updated.filter(item => item.channel === action.payload.channel);
        if(res.length === 0){
            // console.log('no such channel;');
            updated.push(action.payload);
        }
        // console.log('upda', updated);
        if(updated.length === 0){
            // console.log('empty');
            updated.push(action.payload);
        }
        // return [result];
        // console.log('updated', updated);
        return updated;
        default: 
            return state;
    }
}