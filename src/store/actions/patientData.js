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