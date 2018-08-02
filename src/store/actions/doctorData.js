import axios from 'axios'
import * as actionTypes from './actionTypes';

export const sendNewInfoDoctor = (data) => {

    return (dispatch) => {

         axios.post('https://178.172.235.105/~api/json/fusers.doc/updateUserDoc',
                    JSON.stringify(data))
            .then(res => {
                dispatch({
                    type: actionTypes.SEND_NEW_INFO_DOCTOR,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const getInfoDoctor = (id) => {
    const idstr = String(id);
    let ids = {"id":idstr}; //задать самому id доктора
    return (dispatch) => {

        axios.post('https://178.172.235.105/~api/json/fusers.doc/infoDoc',
         JSON.stringify(ids))
            .then(res => {
                console.log("resss", res);
                res.data.result.id= ids.id;

                dispatch({
                    type: actionTypes.INFO_DOCTOR,
                    profileDoctor: res.data.result,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const getNotifications = (id) => {
    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/connect/id/' + id)
            .then(res => {
                console.log('getNotifications', res)
            })
            .catch(err => {
                console.log(err);
        })
    }
}

export const readNotification = (id) => {
    return (dispatch, getState) => {
        console.log('read',id);
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/isreadMessInDB/id/' + id)
            .then(res => {
                console.log('readNotification', res)
            })
            .catch(err => {
                console.log(err);
        })
    }
}

export const getAllDocIntervals = (id) => {
    return (dispatch, getState) => {
        let user;
        id ? user = id : user = getState().auth.id;
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/allDocInterval/id/' + user)
            .then(res => {
                console.log("allDocIntervals", res);

                dispatch({
                    type: actionTypes.GET_ALL_DOC_INTERVALS,
                    intervalsDoctor: res.data.result,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
};