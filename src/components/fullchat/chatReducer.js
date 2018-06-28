import { 
    SET_FULL_CHAT,
    OPEN_FULL_CHAT,
    CHAT_WITH_FULL_CHAT,
    PRIVATE_CHANNEL_FULL_CHAT,
    NOTIFY_PM_FULL_CHAT,
    NOTIFY_CLEAR_FULL_CHAT,
    OLD_NOTIFY_PM_FULL_CHAT,
    SET_UNREAD_FULL_CHAT,
    CLEAR_UNREAD_FULL_CHAT
    
} from './chatTypes';

export default function(state={}, action){
    switch(action.type){
        case SET_FULL_CHAT:
            return action.payload;
        case OPEN_FULL_CHAT:
            return { open: action.payload };
        case CHAT_WITH_FULL_CHAT:
            // console.log('a uiser', action.payload);
            return {...state, chattingWith: action.payload };
        case PRIVATE_CHANNEL_FULL_CHAT:
            return { ...state, channel: action.payload };
        case NOTIFY_PM_FULL_CHAT:
            return {  ...state, notification: action.payload };
        case OLD_NOTIFY_PM_FULL_CHAT: 
            return { ...state, old_notification: action.payload };
        case NOTIFY_CLEAR_FULL_CHAT: 
            return { ...state, notification: null };
        case SET_UNREAD_FULL_CHAT:
            return { ...state, unread: action.payload };
        case CLEAR_UNREAD_FULL_CHAT:
        // console.log('oo', action.payload);
            const omg = state.unread.filter(item => item !== action.payload);
            return { ...state, unread: omg };
        default: 
            return state;
    }
}