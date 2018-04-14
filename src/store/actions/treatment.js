import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getAllTreatments = () => {

    return (dispatch, getState) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/'+getState().auth.id+'/status/')
            .then(res => {
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