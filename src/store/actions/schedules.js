import axios from 'axios'
import * as actionTypes from './actionTypes'
import moment from "moment";




export const addInterval = (interval, start, end) => {
    return (dispatch) => {
        let obj = {
            ...interval,
            id_doc: 2697,
            isEditable: 1,
        }

        axios.post('https://178.172.235.105/~api/json/catalog.doc2/dateWorkInterval',
                    JSON.stringify(obj))
            .then(res => {
                start && dispatch(getAllIntervals(start,end))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getAllIntervals = (start, end) => {
    
    let obj = {
        id_doc: 2697,
        datestart: start.getTime()/1000,
        dateend: end.getTime()/1000,
    }

    return (dispatch) => {
        
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getDateWorkInterval',
                    JSON.stringify(obj))
            .then(res => {
                console.log('[getAllIntervals]',res.data.result)
                dispatch({
                    type: actionTypes.GET_ALL_INTERVALS,
                    intervals: res.data.result,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const clearIntervals = () => {

    return ({
        type: actionTypes.CLEAR_INTERVALS,
    })
}

export const addVisit = (reception, start, end) => {
    return (dispatch) => {
        let obj = {
            ...reception,
            
            id_doc: 2697,
        }
        
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/makingApp',
                    JSON.stringify(obj))
            .then(res => {
                console.log(JSON.stringify(obj))
                console.log('[addVisit]',res)
                start && dispatch(getAllVisits(start,end))
                //dispatch()
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getAllVisits = (start, end) => {
    
    return (dispatch, getState) => {
        let obj = {
            id_doc: getState().auth.id,
            datestart: start.getTime()/1000,
            dateend: end.getTime()/1000,
        }
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getApp',
                    JSON.stringify(obj))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_ALL_VISITS,
                    visits: res.data.result,
                    intervals: res.data.interval.interval,
                    min: res.data.interval.min,
                    max: res.data.interval.max,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
};
export const getAllPatientVisits = () => {

    return (dispatch, getState) => {
        let obj = {
            id_user: getState().auth.id,
        };
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getApp',
                    JSON.stringify(obj))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_ALL_USER_VISITS,
                    allUserVisits: res.data.result,

                })
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export const getCountNearVisits = (count) => {

    return (dispatch, getState) => {
        let obj = {
            id_user: getState().auth.id,
            max: count,
            datestart: moment().format('X')
        };
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getApp',
                    JSON.stringify(obj))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_COUNT_NEAR_VISITS,
                    nearVisits: res.data.result,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const getTodayVisits = () => {
    return (dispatch, getState) => {
        axios.get('https://178.172.235.105/~api/json/catalog.doc2/todayZap/id_doc/'+getState().auth.id)
            .then(res => {
                dispatch({
                    type: actionTypes.GET_ALL_VISITS,
                    visits: res.data.result,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const deleteEvent = () => {

    return (dispatch, getState) => {
        
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/delApp',
                    JSON.stringify({
                        id: getState().schedules.chosenData.id,
                    }))
            .then(res => {
                dispatch({
                    type: actionTypes.DELETE_EVENT,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export const cancelEventsRange = (obj) => {
    let response = {
        ...obj,
        id_doc: 2697,
    }
    
    return (dispatch) => {
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/delAppDateInterval',
                JSON.stringify(response))
        .then(res => {
            dispatch({
                type: actionTypes.CLOSE_CANCEL_MODAL,
            })
        })
        .catch(err => {
            console.log(err);
        });
    }
  };


// --------------- old. REFACTOR!!!

export const selectEvent = (event) => {
    return {
        type: actionTypes.SELECT_EVENT,
        event: event
    }
};
