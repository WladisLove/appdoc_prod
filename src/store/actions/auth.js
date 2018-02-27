import axios from 'axios';
import * as actionTypes from './actionTypes'

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
    };
};

export const registerFail = () => {
    return {
        type: actionTypes.REGISTER_FAIL,
    };
};

export const register = (info) => {
    console.log('[In Register action]');
    return dispatch => {
        axios.post('http://178.172.235.105/~api/json/fusers.doc/createUserDoc', info)
        /*axios({
            method: 'post',
            url: 'http://178.172.235.105/~api/json/fusers.doc/createUserDoc',
            data: {
                ...info
            }
        })*/
            .then(response => {
                console.log('response: ', response);
                dispatch(registerSuccess())
            })
            .catch(err => {
                console.log('error: ', err);
                dispatch(registerFail())
            });
    };
};