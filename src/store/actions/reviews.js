import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getAllReviews = () => {

    return (dispatch, getState) => {
        axios.post('https://178.172.235.105/~api/json/catalog.doc2/getCommentToDoc',
                    JSON.stringify({id_doc: getState().auth.id}))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_ALL_REVIEWS,
                    reviews: res.data.result,
                    ratingAll: res.data.ratingAll,
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