import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getDocPatients = () => {

    return (dispatch, getState) => {
        console.log(getState())
        let id = '2732';
		axios.get('https://178.172.235.105/~api/json/catalog.doc2/getPatientsByDoctorId/id/'+id)
			.then(rez => {
                dispatch({
                    type: actionTypes.GET_DOCTORS_PATIENTS,
                    patients: rez.data,
                })
			})
			.catch(err => {
                console.log(err);
            })
    }
}

export const getNotDocPatients = () => {

    return (dispatch) => {
        let id = '2732';
		axios.get('https://178.172.235.105/~api/json/catalog.doc2/getNoPatientsByDoctorId/id/'+id)
			.then(rez => {
                dispatch({
                    type: actionTypes.GET_NOT_DOCTORS_PATIENTS,
                    patients: rez.data,
                })
			})
			.catch(err => {
                console.log(err);
            })
    }
}