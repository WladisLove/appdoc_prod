import axios from './axiosSettings'
import moment from 'moment'
import * as actionTypes from './actionTypes';
import {getDocShortInfo} from "./doctor";


export const sendNewInfoPatient = (data) => {
    return (dispatch) => {
        return axios.post('/catalog.doc2/saveEditUser',
            JSON.stringify(data))
            .then(res => {
                dispatch(getDocShortInfo());
                return res
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const sendNewPasswordPatient = (oldPass, newPass, id) => {
    return (dispatch, getState) => {
        const id_patient = id ? id : getState().auth.id;

       return axios.post('/catalog.doc2/rePassDoc',
            JSON.stringify({
                id: id_patient,
                oldpass: oldPass,
                newpass: newPass
            }))
            .catch(err => {
                console.log(err);
            })
    }
};
export const hasNoReviewToFreeApp = () => {
    return (dispatch, getState) => {
        const id_patient = getState().auth.id;
        return axios.get(`/catalog.doc2/noCommentToFree/id/${id_patient}`)
            .then(res=>res.data)
    }
};

export const getInfoPatient = (id) => {
    const idstr = String(id);
    let obj = {"id_user":idstr}; //задать самому id доктора
    return (dispatch) => {
        axios.post('/fusers.doc/patientInfoiId',
            JSON.stringify(obj))
            .then(res => {
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
        axios.post('/catalog.doc2/reUserPole',
            JSON.stringify(obj))
            .then(res => {
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

export const deleteAvatar = (id) => {
    return (dispatch, getState) => {
        const user_id = (id ? id : getState().auth.id);
        axios.get('/catalog.doc2/deleteAvatar/id/' + user_id)
            .then(res => {
                dispatch(getInfoPatient(user_id));


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
        axios.get('/catalog.doc2/userInfoShort/id/' + user)
            .then(res => {
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

export const saveGeolocation = (geo) => {
    return {
        type: actionTypes.SAVE_GEOLOCATION,
        latitude: geo.latitude,
        longitude: geo.longitude,
    }
}

export const setUserLocation = (idUser, lng, lat) => {
    return (dispatch) => {
        const obj = { idUser, lng, lat };
        axios.post('/catalog.doc2/setCoordinates', JSON.stringify(obj))
            .then(res => {
                dispatch ({
                    type: actionTypes.SET_USER_LOCATION,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

};

export const addChronicDisease = (disease) => {
    return (dispatch, getState) => {
        const id_user = getState().auth.id;
        const obj = { ...disease, date: moment(disease.date).format("X"),id_user };
        return axios.post('/catalog.doc2/putInChronicDisease', JSON.stringify(obj))
            .then(res => {
                dispatch(getInfoPatient(id_user));
                return res
            })
            .catch(err => {
                console.log(err);
            })
    }

};

export const deleteChronicDisease = (id) => {
    return (dispatch, getState) => {
        const id_user = getState().auth.id;
        const obj = { id };
        return axios.post('/catalog.doc2/deleteChronicDisease', JSON.stringify(obj))
            .then(res => {
                dispatch(getInfoPatient(id_user));
                return res
            })
            .catch(err => {
                console.log(err);
            })
    }

};

