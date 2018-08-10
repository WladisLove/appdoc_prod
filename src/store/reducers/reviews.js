import * as actionTypes from '../actions/actionTypes'

const initialState = {
    reviews: [],
    ratingAll: 0,
    commentCount: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.reviews,
                ratingAll: action.ratingAll,
                commentCount: action.commentCount
            };
        case actionTypes.GET_ALL_REVIEWS_BY_PATIENT:
            return {
                ...state,
                reviewsByPatient: action.reviewsByPatient,
            };

        default: return state;

    }
};

export default reducer;