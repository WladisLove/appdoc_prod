import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getDocPatients = () => {
    return (dispatch) => {
        let id = '2697';
		axios.get('https://178.172.235.105/~api/json/catalog.doc2/getPatientsByDoctorId/id/'+id)
			.then(rez => {
                //console.log('getDocPatients',rez)
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

export const getSelectedPatientInfo = (id) => {
    return (dispatch, getState) => {
        const state = getState();
        let user_id = id ? id : state.patients.selectedId;

        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getInfoByUserId/id_user/'+user_id+'/id_doc/'+state.auth.id)
			.then(rez => {
                console.log('getDocPatients',rez);
                const {diseasesArr, treatmentArr, infoUser} = rez.data.result;
                dispatch({
                    type: actionTypes.GET_SELECTED_PATIENT_INFO,
                    diseases: diseasesArr,
                    treatments: treatmentArr,
                    infoUser: infoUser,
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
            id: 2697,
            name,
        }
        console.log(JSON.stringify(obj))
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getNoPatientsByDoctorId', JSON.stringify(obj))
			.then(rez => {
                //console.log('getNotDocPatients',rez)

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

export const addPatient = (id, name, getInfo = false) => {
    return (dispatch) => {
        let obj = {
            doctorID: 2697,
            patientID: id,
        }
        //console.log(JSON.stringify(obj))
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/putPatientsByDoctorId', JSON.stringify(obj))
			.then(rez => {

                name && dispatch(getNotDocPatients(name));
                getInfo && dispatch(getSelectedPatientInfo(id));
                dispatch(getDocPatients()); 
			})
			.catch(err => {
                console.log(err);
            })
    }
}

export const removePatient = (id_user, id_doctor) => {
    id_doctor = 2697;
    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/removePatientFromDoctor/id/'+id_doctor+'/patientId/'+id_user)
			.then(rez => {
                dispatch(getDocPatients());
                dispatch(getNotDocPatients(''));
			})
			.catch(err => {
                console.log(err);
            })
    }
}


export const selectPatient = (id) => {
    return {
        type: actionTypes.SELECT_PATIENT,
        id: id,
    }
}

export const unselectPatient = () => {
    return {
        type: actionTypes.UNSELECT_PATIENT,
    }
}


// /putMessage
export const sendMessage = (message) => {

 let obj = {
     ...message,
     from: "2697",
 }
    return (dispatch) => {
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/putMessage',JSON.stringify(obj))
        .then(rez => {
            console.log(rez)
        })
        .catch(err => {
            console.log(err);
        })
    }
}