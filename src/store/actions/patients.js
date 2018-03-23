import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getDoctorsPatients = () => {

    return (dispatch) => {
        console.log('here')
        let id = '2732';
		axios.get('https://178.172.235.105/~api/json/catalog.doc2/getPatientsByDoctorId/id/'+id)
			.then(rez => {
                console.log(rez.data)
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