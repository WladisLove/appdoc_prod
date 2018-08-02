import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getAllReviews = (id) => {

    return (dispatch, getState) => {
        const user_id = id ? id : getState().auth.id;
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getCommentToDoc',
                    JSON.stringify({id_doc: user_id}))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_ALL_REVIEWS,
                    reviews: res.data.result ? res.data.result : [],
                    ratingAll: res.data.ratingAll,
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({type: actionTypes.GET_ALL_REVIEWS_ERROR})
            })
    }    
}


export const getAllReviewsByPatient = (pagination) => {
    return (dispatch, getState) => {
        let obj = {id: getState().auth.id};
        pagination ? obj.max = pagination : null;
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/allCommentByUserId',
                    JSON.stringify(obj))
            .then(res => {
                console.log(res, "REWIEWS BY PATIENT");
                dispatch({
                    type: actionTypes.GET_ALL_REVIEWS_BY_PATIENT,
                    reviewsByPatient: res.data.result,
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({type: actionTypes.GET_ALL_REVIEWS_ERROR})
            })
    }
}


export const putCommentAnswer = (answer) => {

    return (dispatch) => {
        dispatch({type: actionTypes.PUT_COMMENT_ANSWER})

        axios.post('https://178.172.235.105/~api/json/catalog.doc2/putAnsCommentToDoc',
                    JSON.stringify(answer))
            .then(res => {
                dispatch(getAllReviews());
            })
            .catch(err => {
                console.log(err);
                dispatch({type: actionTypes.PUT_COMMENT_ANSWER_ERROR})
        })
    }    
}