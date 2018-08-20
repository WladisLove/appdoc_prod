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
                dispatch({
                    type: actionTypes.GET_COMPLETED_TREATMENTS,
                    treatments: res.data,
                });
            })
            .catch(err => {
                console.log(err);
        })
    }
};

export const getCompletedApps = () => {
    return (dispatch, getState) => {

        axios.post('https://178.172.235.105/~api/json/catalog.doc2/allMAcompleteMyIdUser',
            JSON.stringify({
                id: getState().auth.id
            }))
            .then(res => {
                console.log("COMPLETED APPS", res);
                dispatch({
                    type: actionTypes.GET_COMPLETED_APPS,
                    completedApps: res.data,
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
                    treatInfo: {
                        ...res.data.result,
                        id_treatment: treatId,
                    },
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const uploadChatFile = (id_zap,id_user,file, callback) => {
    return (dispatch) => {
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/saveFilesChat',
            JSON.stringify({
                id_zap,
                id_user,
                file: [file]
            }))
            .then(res => {
                const {result} = res.data;
                (callback instanceof Function) && result &&  callback(result[0]);
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const uploadConclusion = (id_zap,file, callback) => {
    return (dispatch) => {
        //console.log(file.thumbUrl.substr(0,50));
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/saveFilesZak',
            JSON.stringify({
                id_zap,
                file,
            }))
            .then(res => {
                const {result} = res.data;
                (callback instanceof Function) &&  callback(result);
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const getAllFilesTreatment = (treatId) => {
    return (dispatch) => {
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/allFilesTreatment',
        JSON.stringify({id: treatId}))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_TREATMENT_FILES,
                    files: res.data,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const seletVisit = (visId) => {
    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getInfoByMakingAppId/id/'+visId)
            .then(res => {
                console.log('[seletVisit]',res.data)
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


export const changeReceptionStatus = (id,key) => {

    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/addMakingAppTime/id/'+id+'/key/'+key)
            .then(res => {
                key === "finish" && dispatch(getReceptionDuration(id));
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const getReceptionDuration = (id) => {

    return (dispatch) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/getMakingAppTimeCost/id/'+id)
            .then(res => {
                const {second, cost} = res.data.result;
                alert('Reception Duration: '+second+'s\nTotal Price: '+cost+"BYN")
            })
            .catch(err => {
                console.log(err);
        })
    }    
}