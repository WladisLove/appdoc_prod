import axios from './axiosSettings'
import * as actionTypes from './actionTypes';

export const getDocTodayInfo = () => {
    return (dispatch, getState) => {
        axios.get('/catalog.doc2/todayActualZap/id_doc/'+getState().auth.id)
            .then(res => {
                dispatch({
                    type: actionTypes.GET_DOCTOR_TODAY_INFO,
                    todayInfo: res.data.result,                    
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const getDocShortInfo = () => {
    return (dispatch, getState) => {
        axios.get('/catalog.doc2/dopInfoDocBiId/id_doc/'+getState().auth.id)
            .then(res => {
                dispatch({
                    type: actionTypes.GET_DOCTOR_SHORT_INFO,
                    info: res.data.result,
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const setExIntervalInfo = (isIn, isUserSet) => {
    
        return ({
            type: actionTypes.SET_EX_INTERVAL_INFO,
            isIn,
            isUserSet,            
        });
     
}

export const switchExInterval = (isIn) => {
    return (dispatch, getState) => {
        let tmp = isIn ? '1' : '0';
        axios.get('/catalog.doc2/isIn/id/'+getState().auth.id +'/isin/' + tmp + '/isUserSet/1')
            .then(res => {
                dispatch({
                    type: actionTypes.SWITCH_EX_INTERVAL,
                    isIn,                 
                });
            })
            .catch(err => {
                console.log(err);
        })
    }    
}

export const getEmergencyAvailability = () => {
    return (dispatch, getState) => {
        axios.get('/catalog.doc2/canExt/id/'+getState().auth.id)
            .then(res => {
                console.log(res);
                dispatch({
                    type: actionTypes.GET_EMERGENCY_AVAILABILITY,
                    availability: res.data.process
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getDoctorSpecialities = () => {
    
    return (dispatch, getState) => {
        axios.get('/catalog.doc2/getDoctorSpecialities')
            .then(res => {
                console.log(res);
                debugger
                dispatch({
                    type: actionTypes.GET_DOCTOR_SPECIALITIES,
                    docSpecialities: Array.isArray(res.data.result) ? res.data.result.map(el => el.title) : []
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getAvailLangs = () => {
    
    return (dispatch, getState) => {
        axios.get('/catalog.doc2/getAvailLangs')
            .then(res => {
                console.log(res);
                debugger
                dispatch({
                    type: actionTypes.GET_AVAIL_LANGUAGES,
                    availLanguages: Array.isArray(res.data.result) ? res.data.result.map(el => el.title) : []
                })
                
            })
            .catch(err => {
                console.log(err);
            })
    }
}