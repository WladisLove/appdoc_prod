import * as actionTypes from './actionTypes';
import axios from "./axiosSettings";


export const setReceptionStatus = (isStart) => {
    return ({
        type: actionTypes.SET_RECEPTION_ISSTART,
        isStart,
    });
}

export const setIsCallingStatus = (isCalling) => {
    return ({
        type: actionTypes.SET_RECEPTION_ISCALLING,
        isCalling,
    });
}

export const setChatFromId = (id) => {
    return ({
        type: actionTypes.SET_CHAT_FROM_ID,
        id,
    });
}

export const setChatToId = (id) => {
    return ({
        type: actionTypes.SET_CHAT_TO_ID,
        id,
    });
}

export const setChatStory = (chat) => {
    return ({
        type: actionTypes.SET_CHAT_STORY,
        chat,
    });
}

export const setNewTimer = (timer) => {
    return ({
        type: actionTypes.SET_NEW_TIMER,
        timer,
    });
}

export const setUserStatus = (status) => {
    return ({
        type: actionTypes.SET_USER_STATUS,
        status,
    });
}



export const getPatientLocation = (id) => {
    return (dispatch) => {
        const userID = {
            id: '' + id,
        };

        axios.post('catalog.doc2/infoUser', JSON.stringify(userID))
            .then(res => {
                if(res.data.result) {
                    dispatch({
                        type: actionTypes.GET_PATIENT_LOCATION,
                        location:  {
                            lat: res.data.result.lat,
                            lng: res.data.result.lng,
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};