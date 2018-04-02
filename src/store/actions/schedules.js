import axios from 'axios'
import * as actionTypes from './actionTypes'




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
                //console.log('add response',res)
                start && dispatch(getAllIntervals(start,end))
                //dispatch()
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
                //console.log('get response',res.data)
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




// --------------- old. REFACTOR!!!

export const selectEvent = (event) => {
    return {
        type: actionTypes.SELECT_EVENT,
        event: event
    }
};

export const deleteEvent = () => {
    return {
        type: actionTypes.DELETE_EVENT,
    }
};

export const openCancelModal = () =>{
    return {
        type: actionTypes.OPEN_CANCEL_MODAL
    }
};

export const closeCancelModal = (toSave = false, obj) => {
  return {
      type: actionTypes.CLOSE_CANCEL_MODAL,
      toSave,
      object: obj
  }
};
