import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getAllTreatments = () => {

    return (dispatch, getState) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/'+getState().auth.id+'/status/')
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: actionTypes.GET_ALL_TREATMENTS,
                    treatments: res.data,
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const getActualTreatments = () => {

    return (dispatch, getState) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/'+getState().auth.id+'/status/topical')
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: actionTypes.GET_ACTUAL_TREATMENTS,
                    treatments: res.data,
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const completeReception = (obj) => {
    return dispatch => {
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/toFinishReception', 
            JSON.stringify(obj))
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
        })
    }
}

export const uploadFiles = (arr) => {
    console.log(arr[0])
    console.log(arr[0].thumbUrl)
    let obj = {
        id_zap: 126029,
        id_user: "54321",
        file: arr
    }
    console.log(obj)
    console.log(JSON.stringify(obj))
    console.log('-----------')
    console.log((obj.file.thumbUrl))
    console.log(JSON.stringify(obj.file.thumbUrl))
    return dispatch => {
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/saveFilesChat',
            JSON.stringify(obj))
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
}