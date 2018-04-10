
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    id: 0,
    mode: "", // doctor / patient
    error: null,
    errorCode: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                errorCode: 0,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                errorCode: action.errorCode,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                id: action.id,
                mode: action.usergroup,
            };
        default: return state;
    }
};

export default reducer;