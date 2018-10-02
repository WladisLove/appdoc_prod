import * as actionTypes from './actionTypes';
import axios from './axiosSettings'


export const loadingStart = (loader) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOADING_START,
            loader: loader
        })
    }
};
export const loadingEnd = (loader) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOADING_END,
            loader: loader
        })
    }
};

export const docEmergancyCallSend = () => {
    return (dispatch, getState) => {
        axios.get('/catalog.doc2/docTakeMakinAppFromAll/id_doc/' + getState().auth.id)
            .then(res => {
                res.data.code === 200 ? 
                    dispatch(docEmergancyCallReceived(res.data.result.id_makingApp,true)) 
                    : dispatch(docEmergancyCallReceived(0, false));
            })
            .catch(err => {
                console.log(err);
        });
    }
};
export const docEmergancyCallReceived = (visitId, isConfirmed) => {
    return {
        type: actionTypes.DOC_EMERGANCY_REQUEST_RECEIVED,
        visitId,
        isConfirmed,
    }
};

export const docEmergancyCallReceivedMark = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DOC_EMERGANCY_RECEIVED_MARK,
        })
    }
};