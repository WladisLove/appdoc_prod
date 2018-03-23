import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patients: [],
    selectedId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_DOCTORS_PATIENTS: 
            return {
                ...state,
                patients: action.patients,
            }
        default: return state;
    }
}

export default reducer;