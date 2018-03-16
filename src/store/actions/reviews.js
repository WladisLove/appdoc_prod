import axios from 'axios'
import * as actionTypes from './actionTypes';

export const getAllReviews = () => {
        axios.post('http://178.172.235.105/~api/json/catalog.doc2/getCommentToDoc',
                    JSON.stringify({id_doc: '2697'}))
            .then(res => console.log('response: ',res.data.result))
            .catch(err => console.log('error: ',err))
    return {
        type: actionTypes.GET_ALL_REVIEWS,
        reviews: [],
    }
}