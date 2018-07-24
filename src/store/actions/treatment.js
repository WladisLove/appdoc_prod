import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getAllTreatments = () => {

    return (dispatch, getState) => {
        let isUser = getState().auth.mode === "user" ? "/isuser/1" : "";
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/'+getState().auth.id+isUser)
            .then(res => {
                console.log('[getAllTreatments]',res.data)
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
export const getCompletedTreatments = () => {
    return (dispatch, getState) => {
        let isUser = getState().auth.mode === "user" ? "/isuser/1" : "";
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/'+getState().auth.id+'/status/completed'+isUser)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: actionTypes.GET_COMPLETED_TREATMENTS,
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
                console.log('[completeReception]',JSON.stringify(obj))
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
        })
    }
}

export const closeTreatment = (id) => {
    return dispatch => {
        console.log('closeTreatment', id)
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/changeStatus/id/'+id+'/status/completed')
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
        })
    }
}

export const selectTreatment = (treatId) => {

    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentBiId/id/'+treatId)
            .then(res => {
                dispatch({
                    type: actionTypes.SELECT_TREATMENT,
                    treatInfo: res.data.result,
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const uploadChatFile = (file) => {

    return (dispatch) => {
        console.log(file.thumbUrl.substr(0,50));
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/saveFilesChat',
            JSON.stringify([file]))
            .then(res => {
                console.log(JSON.stringify([file]))
                console.log(res)
                /*dispatch({
                    type: actionTypes.SELECT_TREATMENT,
                    treatInfo: res.data.result,
                });*/
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const seletVisit = (visId) => {
    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getInfoByMakingAppId/id/'+visId)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: actionTypes.SELECT_VISIT,
                    visitInfo: res.data,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const clearSelections = () => {
    return ({
        type: actionTypes.CLEAR_VISIT_AND_TREAT,
    })
}
