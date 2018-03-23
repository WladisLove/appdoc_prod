
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    id: 0,
    mode: "", // doctor / patient
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                id: action.id,
            };
        default: return state;
    }
};

export default reducer;