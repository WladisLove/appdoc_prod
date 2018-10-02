import * as actionTypes from './actionTypes';


export const setReceptionStatus = (isStart) => {
    console.log('setReceptionStatus',isStart)
    return ({
        type: actionTypes.SET_RECEPTION_ISSTART,
        isStart,
    });
}

export const setIsCallingStatus = (isCalling) => {
    console.log('setReceptionStatus',isCalling)
    return ({
        type: actionTypes.SET_RECEPTION_ISCALLING,
        isCalling,
    });
}

export const setChatFromId = (id) => {
    console.log('setChatFromId',id);
    return ({
        type: actionTypes.SET_CHAT_FROM_ID,
        id,
    });
}

export const setChatToId = (id) => {
    console.log('setChatToId',id)
    return ({
        type: actionTypes.SET_CHAT_TO_ID,
        id,
    });
}

export const setChatStory = (chat) => {
    console.log('setChatStory',chat)
    return ({
        type: actionTypes.SET_CHAT_STORY,
        chat,
    });
}

export const setNewTimer = (timer) => {
    console.log(actionTypes.SET_NEW_TIMER,timer);
    return ({
        type: actionTypes.SET_NEW_TIMER,
        timer,
    });
}