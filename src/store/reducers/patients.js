import * as actionTypes from '../actions/actionTypes'

const initialState = {
    docPatients: [],
    notDocPatients: [],
    selectedId: 0,
    selectedPatientInfo:{},
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
        case actionTypes.GET_SELECTED_PATIENT_INFO:
            return {
                ...state,
                selectedPatientInfo: {
                    diseases: action.diseases,
                    treatments: action.treatments,
                    infoUser: action.infoUser,
                }
            }
        case actionTypes.SELECT_PATIENT:
            return {
                ...state,
                selectedId: action.id,
            }
        case actionTypes.UNSELECT_PATIENT:
            return {
                ...state,
                selectedId: 0,
            }
        default: return state;
    }
}

export default reducer;