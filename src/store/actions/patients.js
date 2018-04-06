import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getDocPatients = () => {

    return (dispatch) => {
        let id = '2732';
		axios.get('https://178.172.235.105/~api/json/catalog.doc2/getPatientsByDoctorId/id/'+id)
			.then(rez => {
                console.log('getDocPatients',rez)
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

export const getNotDocPatients = (name) => {

    return (dispatch) => {
        let obj = {
            id: 2732,
            name,
        }
        console.log(JSON.stringify(obj))
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getNoPatientsByDoctorId', JSON.stringify(obj))
			.then(rez => {
                console.log('getNotDocPatients',rez)

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

export const clearNotDocPatients = () => {
    return {
        type: actionTypes.GET_NOT_DOCTORS_PATIENTS,
        patients: [],
    }
}

export const addPatient = (id, name) => {
    return (dispatch) => {
        let obj = {
            doctorID: 2732,
            patientID: id,
        }
        console.log(JSON.stringify(obj))
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/putPatientsByDoctorId', JSON.stringify(obj))
			.then(rez => {
                console.log(rez)

                dispatch(getNotDocPatients(name))
                dispatch(getDocPatients())
			})
			.catch(err => {
                console.log(err);
            })
    }
}

// /removePatientFromDoctor/id/{id}/patientId/{patientId}
export const removePatient = (id_user, id_doctor) => {
    id_doctor = 2732;
    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/removePatientFromDoctor/id/'+id_doctor+'/patientId/'+id_user)
			.then(rez => {
                console.log(rez)
                dispatch(getDocPatients())
			})
			.catch(err => {
                console.log(err);
            })
    }
}