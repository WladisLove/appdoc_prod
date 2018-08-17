import axios from 'axios'
import * as actionTypes from './actionTypes';

export const sendNewInfoPatient = (data) => {
    console.log(data, "DATA PATIENT EDITING");
    return (dispatch) => {

        axios.post('https://178.172.235.105/~api/json/catalog.doc2/saveEditUser',
            JSON.stringify(data))
            .then(res => {
                console.log("result of editing" , res);
                dispatch({
                    type: actionTypes.SEND_NEW_INFO_PATIENT,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const sendNewPasswordPatient = (oldPass, newPass, id) => {
    console.log(oldPass + " " + newPass, "PASSWORD PATIENT EDITING");
    return (dispatch, getState) => {
        const id_patient = id ? id : getState().auth.id;

        axios.post('https://178.172.235.105/~api/json/catalog.doc2/rePassDoc',
            JSON.stringify({
                id: id_patient,
                oldpass: oldPass,
                newpass: newPass
            }))
            .then(res => {
                console.log("result of editing" , res);
                dispatch({
                    type: actionTypes.SEND_NEW_PASSWORD_PATIENT,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const getInfoPatient = (id) => {
    const idstr = String(id);
    let obj = {"id_user":idstr}; //задать самому id доктора
    return (dispatch) => {
        axios.post('https://178.172.235.105/~api/json/fusers.doc/patientInfoiId',
            JSON.stringify(obj))
            .then(res => {
                console.log("resss", res);
                res.data.result.id = obj.id_user;

                dispatch({
                    type: actionTypes.INFO_PATIENT,
                    profilePatient: res.data.result,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const sendUserPoleValue = (pole, value, id) => {
    return (dispatch, getState) => {
        const obj = {pole, id: id ? id : getState().auth.id, value};
        console.log(obj, "OBJ");
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/reUserPole',
            JSON.stringify(obj))
            .then(res => {
                console.log("reUserPole", res);

                dispatch({
                    type: actionTypes.SEND_USER_POLE_VALUE,
                    pole: pole.charAt(0).toUpperCase() + pole.slice(1),
                    value: res.data.result
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const getUserInfoShort = (id) => {
    return (dispatch, getState) => {
        let user;
        id ? user = id : user = getState().auth.id;
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/userInfoShort/id/' + user)
            .then(res => {
                console.log("userInfoShort", res);

                dispatch({
                    type: actionTypes.GET_USER_INFO_SHORT,
                    userInfoShort: res.data.result,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
};