import axios from 'axios'
import * as actionTypes from './actionTypes';

export const login = (userName, password, rememberMe) => {

    return (dispatch) => {
        console.log(userName,password,rememberMe);

        dispatch(authStart());
        axios.post('https://178.172.235.105/~api/json/fusers.doc/loginDoc',
                JSON.stringify({
                    login: userName,
                    password: password,
                }))
                    .then(res => {
                        console.log('response: ',res);
                        
                        //dispatch(authSuccess(response.data.idToken, response.data.localId));

                        !res.data.error 
                            ? (
                                dispatch(authSuccess()),
                                rememberMe(rememberMe)
                            )
                            : dispatch(authFail(res.data.error));

                        /*!res.data.error 
                            ? history.push('/') 
                            : res.data.error.code === 400 
                                ? alert('неверный логин или пароль')
                                : alert('такого пользователя не существует')
                        */
                    })
                    .catch(err => {
                        console.log('error: ',err);
                        //dispatch(authFail(err.response.data.error));
                    })
    }
}

const rememberMe = (flag) => {
    flag ? 
        localStorage.setItem('_appdoc-id',)
        : null;
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        id: id
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};