import { 
    SET_FULL_CHAT,
    OPEN_FULL_CHAT,
    CHAT_WITH_FULL_CHAT,
    PRIVATE_CHANNEL_FULL_CHAT,
    NOTIFY_PM_FULL_CHAT,
    NOTIFY_CLEAR_FULL_CHAT,
    OLD_NOTIFY_PM_FULL_CHAT,
    SET_UNREAD_FULL_CHAT,
    CLEAR_UNREAD_FULL_CHAT,
    SET_PRIVATE_MESSAGES,
    SET_URL,
    SET_USER_LIST,
    SET_GLOBAL_MESSAGES
} from './chatTypes';

export function setUrl(url){
    return {
        type: SET_URL,
        payload: url
    };   
}

export function setUserList(list){
    return {
        type: SET_USER_LIST,
        payload: list
    };
}

export function setGlobalMessages(message){
    return function(dispatch, getState){
        dispatch({ type: SET_GLOBAL_MESSAGES, payload: message });
    }
}

export function setUnread(data){
    return function(dispatch, getState){
        let { unread } = getState().fullChat;
        let { chattingWith } = getState().fullChat;
        if(Array.isArray(data)){
            return dispatch({ type: SET_UNREAD_FULL_CHAT, payload: data });
        }
        if(data){
            if(data.writing !== chattingWith){
                if(!unread){
                    unread = [];
                    unread.push(data.writing);
                    dispatch({ type: SET_UNREAD_FULL_CHAT, payload: unread });
                } else {
                    //unread exists
                    let x = unread.filter(user => user !== data.writing);
                    x.push(data.writing);
                    dispatch({ type: SET_UNREAD_FULL_CHAT, payload: x});
                }
                // unread.push(data.writing);   
            } 
        }

        
    }
}
export function clearUnread(user){
    return function(dispatch, getState){
        let { unread } = getState().fullChat;
        if(unread){
            // const x = unread.filter(item => item !== user);
            dispatch({ type: CLEAR_UNREAD_FULL_CHAT, payload: user });
        } else {
            // dispatch({ type: CLEAR_UNREAD_FULL_CHAT, payload: [] });            
        }
    }
}
export function fullChatConnected(v){
    return {
        type: SET_FULL_CHAT,
        payload: v
    };
}
export function fullChatPrivateChannel(channel){
    return {
        type: PRIVATE_CHANNEL_FULL_CHAT,
        payload: channel
    };
}
export function fullChatOpen(open){
    return {
        type: OPEN_FULL_CHAT,
        payload: open
    };
}
export function fullChatChattingWith(user){
    return {
        type: CHAT_WITH_FULL_CHAT,
        payload: user
    };
}
export function fullChatNotificationClear(){
    return {
        type: NOTIFY_CLEAR_FULL_CHAT,
        payload: null
    };
}
export function fullChatNotification(note){
    return {
        type: NOTIFY_PM_FULL_CHAT,
        payload: note
    };
}
export function fullChatOldNotification(note){
    return {
        type: OLD_NOTIFY_PM_FULL_CHAT,
        payload: note
    };
}
export function setPrivateMessages(messages){
    // return {
    //     type: SET_PRIVATE_MESSAGES,
    //     payload: messages
    // };
    return function(dispatch, getState){
        // let { fullChat } = getState();
        let { privateMessages } = getState();
        // console.log('fullChat getState', fullChat);

        // if(!fullChat){
            //chat is not mounted
            // console.log('-2-2-2-2-2-22-2-2-', privateMessages);
            if(privateMessages.length === 0){
                // console.log('00-', messages);
                dispatch({ type: SET_PRIVATE_MESSAGES, payload: messages });
            } else if(privateMessages.length > 0){
                            // console.log('-2-2-2-2-2-22-2-2-', privateMessages);

                //should have an array of one obj with channel or empty array
                let help = privateMessages.filter(item => item.channel === messages.channel);
                if(help.length === 0){
                    //empty, push into privateMessages -- another private chat
                    
                    // privateMessages.push(messages);
                    // console.log('empty - push into array', messages);
                    dispatch({ type: SET_PRIVATE_MESSAGES, payload: messages });
                } else {
                    // there is an obj with the same channel, push the messages into its messages array
                    // console.log('push into messages - same channel', help);
                    // console.log('me is wrfd', help[0].messages);
                    // console.log('qweqweqweqew', messages.messages);
                    // if(!fullChat){
                        help[0].messages.push(messages.messages[0]);
                        // const q = {
                        //     chat: fullChat,
                        //     m: help[0]
                        // };
                        // return dispatch({ type: SET_PRIVATE_MESSAGES, payload: q });
                    // }
                    dispatch({ type: SET_PRIVATE_MESSAGES, payload: help[0] });
                }
            }
        // } 
        // else {
        //     dispatch({ type: SET_PRIVATE_MESSAGES, payload: messages });
        // }
       
        // return {
        //     type: SET_PRIVATE_MESSAGES,
        //     payload: messages
        // };
    }
}