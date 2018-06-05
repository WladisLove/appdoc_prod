import axios from 'axios'
import * as actionTypes from './actionTypes';


export const autoLogin = (history) => {
    return (dispatch) => {

        const login = localStorage.getItem('_appdoc-user');
        const passw = localStorage.getItem('_appdoc-pass');

        if(login && passw){
            dispatch(login(login, passw, false, history, true));
        }
    }
}

export const login = (userName, password, remember, history, isAuto) => {

    return (dispatch) => {
        dispatch(authStart());

        axios.post('https://178.172.235.105/~api/json/fusers.doc/loginDoc',
                JSON.stringify({
                    login: userName,
                    password: password,
                }))
                    .then(res => {
                        //console.log('response: ',res);
                        
                        //dispatch(authSuccess(response.data.idToken, response.data.localId));
//console.log(history)
                        !res.data.error 
                            ? (
                                dispatch(authSuccess(res.data.id, res.data.usergroup)),
                                rememberMe(remember, userName, password),
                                history.push('/') 
                            )
                            : (
                                dispatch(authFail(res.data.error)),
                                    isAuto && (
                                        // TODO: test
                                        localStorage.removeItem('_appdoc-user'),
                                        localStorage.removeItem('_appdoc-pass')//,
                                        //sessionStorage.setItem('_appdoc-id', 'Tom')
                                    )
                            );
                    })
                    .catch(err => {
                        console.log('error: ',err);
                        //dispatch(authFail(err.response.data.error));
                    })
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('_appdoc-user');
        localStorage.removeItem('_appdoc-pass');
        dispatch(authSuccess(0, ''));
    }

}

const rememberMe = (flag, userName, password) => {
    flag ? 
        (localStorage.setItem('_appdoc-user',userName),
        localStorage.setItem('_appdoc-pass',password))
        : null;
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (id, usergroup) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        id,
        usergroup,
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        errorCode: error.code,
    };
};