import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getAllReviews = (numberOfRequest = 0, maxReviews = 3, dateStart, dateEnd, id) => {

    return (dispatch, getState) => {
        const user_id = id ? id : getState().auth.id;
        const datestart = dateStart ? dateStart : 0;
        const dateend = dateEnd ? dateEnd : (+new Date());
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getCommentToDoc',
                    JSON.stringify({
                        id_doc: user_id,
                        max: maxReviews,
                        old: numberOfRequest * maxReviews,
                        datestart: datestart,
                        dateend: dateend
                    }))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_ALL_REVIEWS,
                    reviews: res.data.result ? res.data.result : [],
                    ratingAll: res.data.ratingAll ? res.data.ratingAll : 0,
                    commentCount: res.data.commentCount ? res.data.commentCount : 0
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({type: actionTypes.GET_ALL_REVIEWS_ERROR})
            })
    }    
}


export const getAllReviewsByPatient = (numberOfRequest = 0, maxReviews = 3, dateStart, dateEnd, id) => {
    return (dispatch, getState) => {
        const user_id = id ? id : getState().auth.id;
        const datestart = dateStart ? dateStart : 0;
        const dateend = dateEnd ? dateEnd : (+new Date());
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/allCommentByUserId',
            JSON.stringify({
                id: user_id,
                max: maxReviews,
                old: numberOfRequest * maxReviews,
                datestart: datestart,
                dateend: dateend
            }))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_ALL_REVIEWS_BY_PATIENT,
                    reviewsByPatient: res.data.result ? res.data.result : [],
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