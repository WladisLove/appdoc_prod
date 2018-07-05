import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getDateInterval = (beginDay, endDay) => {
    return (dispatch, getState) => {
        let obj = 
        {
            id_doc: getState().auth.id,
            datestart: beginDay,
            dateend: endDay
        };
	
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getDateWorkInterval', JSON.stringify(obj))
			.then(rez => {
                dispatch({
                    type: actionTypes.GET_DATE_INTERVAL,
                    intervals: rez.data.result,
                })
			})
			.catch(err => {
                console.log(err);
            })
    }
}

export const getDocPatients = () => {
    return (dispatch, getState) => {
		axios.get('https://178.172.235.105/~api/json/catalog.doc2/getPatientsByDoctorId/id/'+getState().auth.id)
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
        let user_id = id ? id : getState().patients.selectedId;

        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getInfoByUserId/id_user/'+user_id+'/id_doc/'+getState().auth.id)
			.then(rez => {
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
    return (dispatch, getState) => {
        let obj = {
            id: getState().auth.id,
            name,
        }
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getNoPatientsByDoctorId', JSON.stringify(obj))
			.then(rez => {
                //console.log('getNotDocPatients',rez.data)
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
    return (dispatch, getState) => {
        let obj = {
            doctorID: getState().auth.id,
            patientID: id,
        }
        //console.log(JSON.stringify(obj))
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/putPatientsByDoctorId', JSON.stringify(obj))
			.then(rez => {

                dispatch(getNotDocPatients(name));
                getInfo && dispatch(getSelectedPatientInfo(id));
                dispatch(getDocPatients()); 
			})
			.catch(err => {
                console.log(err);
            })
    }
}

export const removePatient = (id_user, id_doctor) => {
    return (dispatch, getState) => {
        let doc_id = id_doctor ? id_doctor : getState().auth.id;
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/removePatientFromDoctor/id/'+doc_id+'/patientId/'+id_user)
			.then(rez => {
                dispatch(getDocPatients());
                //dispatch(getNotDocPatients(''));
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

 
    return (dispatch, getState) => {
        let obj = {
            ...message,
            from: getState().auth.id,
        }

        axios.post('https://178.172.235.105/~api/json/catalog.doc2/putMessage',JSON.stringify(obj))
        .then(rez => {
            console.log(rez)
        })
        .catch(err => {
            console.log(err);
        })
    }
}
