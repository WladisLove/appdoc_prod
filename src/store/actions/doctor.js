import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getDocTodayInfo = () => {

    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/todayActualZap/id_doc/'+2697)
            .then(res => {
                dispatch({
                    type: actionTypes.GET_DOCTOR_TODAY_INFO,
                    todayInfo: res.data.result,                    
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const getDocShortInfo = () => {

    return (dispatch) => {
        axios.get('http://178.172.235.105/~api/json/catalog.doc2/dopInfoDocBiId/id_doc/'+2697)
            .then(res => {
                console.log(res)
                dispatch({
                    type: actionTypes.GET_DOCTOR_SHORT_INFO,
                    info: res.data.result,
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}