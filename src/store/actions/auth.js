import axios from 'axios'
import * as actionTypes from './actionTypes';

export const login = ({userName, password}, history) => {

    return (dispatch) => {

        console.log(userName,password, history)
        axios.post('https://178.172.235.105/~api/json/fusers.doc/loginDoc',
                JSON.stringify({
                    login: userName,
                    password: password,
                }))
                    .then(res => {
                        console.log('response: ',res);

                        dispatch({

                        })
                        /*!res.data.error 
                            ? history.push('/') 
                            : res.data.error.code === 400 
                                ? alert('неверный логин или пароль')
                                : alert('такого пользователя не существует')
                        */
                    })
                    .catch(err => console.log('error: ',err))
    }
}