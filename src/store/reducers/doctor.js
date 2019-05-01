import * as actionTypes from '../actions/actionTypes'

const initialState = {
    todayInfo: {},
    shortInfo: {
        specialty: [],
    },
    isEx: false,
    isUserSetEx: false,
    emergencyAvailable: false,
    docSpecialities: [],
    availLanguages: []
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_DOCTOR_TODAY_INFO:
            return {
                ...state,
                todayInfo: action.todayInfo,
            }
        case actionTypes.GET_DOCTOR_SHORT_INFO:
            return {
                ...state,
                shortInfo: action.info,
            }
        case actionTypes.SET_EX_INTERVAL_INFO:
            return {
                ...state,
                isEx: action.isIn,
                isUserSetEx: action.isUserSet,
            }
        case actionTypes.SWITCH_EX_INTERVAL:
            return {
                ...state,
                isEx: action.isIn,
                isUserSetEx: true,
            }
        case actionTypes.GET_EMERGENCY_AVAILABILITY:
            return {
                ...state,
                emergencyAvailable: action.availability
            }
        
        case actionTypes.GET_DOCTOR_SPECIALITIES_DOCTORDATA:
            return {
                ...state,
                docSpecialities: action.docSpecialities
            }

        case actionTypes.GET_AVAIL_LANGUAGES_DOCTORDATA:
            return {
                ...state,
                availLanguages: action.availLanguages
            }
            
        default: return state;
    }
};

export default reducer;