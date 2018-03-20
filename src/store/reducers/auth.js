import * as actionTypes from '../actions/actionTypes'

const initialState = {
    id: 0,
    mode: "", // doctor / patient
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        //case actionTypes.AUTH_START:
        //case actionTypes.AUTH_FAIL:
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                id: action.id,
            };
        default: return state;
    }
};

export default reducer;