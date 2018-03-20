import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        //idToken: token,
        //mode:
        id: id
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (login, password) => {
    const data = {
        login,
        password
    };
    console.log('data:', data);
    return dispatch => {
        dispatch(authStart());
        // const authData = {
        //     email: email,
        //     password: password,
        //     returnSecureToken: true
        // };
        // let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
        // if (!isSignup) {
        //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
        // }
        axios.post('http://178.172.235.105/~api/json/catalog.doc2/loginDoc',
                JSON.stringify(data))
            .then(response => {
                console.log(response);
                // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // localStorage.setItem('token', response.data.idToken);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.localId);
                //dispatch(authSuccess(response.data.idToken, response.data.localId));
                //dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                //dispatch(authFail(err.response.data.error));
            });
    };
};