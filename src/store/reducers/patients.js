import * as actionTypes from '../actions/actionTypes'

const initialState = {
    docPatients: [],
    notDocPatients: [],
    selectedId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_DOCTORS_PATIENTS: 
            return {
                ...state,
                docPatients: action.patients,
            }
        case actionTypes.GET_NOT_DOCTORS_PATIENTS:
            return {
                ...state,
                notDocPatients: action.patients,
            }
        default: return state;
    }
}

export default reducer;