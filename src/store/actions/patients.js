import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getDocPatients = () => {

    return (dispatch) => {
        let id = '2732';
		axios.get('https://178.172.235.105/~api/json/catalog.doc2/getPatientsByDoctorId/id/'+id)
			.then(rez => {
                console.log(rez)
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
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getNoPatientsByDoctorId',
                JSON.stringify({
                    id: 2732,
                })
            )
			.then(rez => {
                console.log(rez)

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