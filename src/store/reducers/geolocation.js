import * as actionTypes from '../actions/actionTypes'

const initialState = {
    doctors: []
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_DOCTORS_LOCATION:
            return {
                ...state,
                doctors: action.doctors,
            };
        case actionTypes.GET_DOCTORS_LOCATION_ERROR:
            return {
                ...state,
                doctors: action.doctors,
            };

        default: return state;
    }
};

export default reducer;


