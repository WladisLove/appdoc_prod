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
