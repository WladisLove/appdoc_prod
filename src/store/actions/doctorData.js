import axios from 'axios'
import * as actionTypes from './actionTypes';

export const sendNewInfoDoctor = (data) => {

    return (dispatch) => {

         axios.post('https://178.172.235.105/~api/json/fusers.doc/updateUserDoc',
                    JSON.stringify(data))
            .then(res => {
                console.log("update", res.data.result);
                dispatch({
                    type: actionTypes.SEND_NEW_INFO_DOCTOR,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const getInfoDoctor = () => {
    console.log('getInfoDoctor');
    let ids = {"id":"2732"}; //задать самому id доктора
    return (dispatch) => {

        axios.post('https://178.172.235.105/~api/json/fusers.doc/infoDoc',
         JSON.stringify(ids))
            .then(res => {
                console.log("res_data", res.data.result);
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
