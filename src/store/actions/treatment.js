import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getAllTreatments = () => {

    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/'+2732+'/status/')
            .then(res => {
                console.log(res)
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

    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/'+2732+'/status/topical')
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