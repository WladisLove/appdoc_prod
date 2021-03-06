
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    id: sessionStorage.getItem('_appdoc-id') ? sessionStorage.getItem('_appdoc-id') : 0,
    mode: sessionStorage.getItem('_appdoc-mode') ? sessionStorage.getItem('_appdoc-mode') : "", // doc / user
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
        case actionTypes.REG_DOCTOR_START:
            return {
                ...state,
                isRegInProgress: true
            };
        case actionTypes.REG_DOCTOR_EXIST:
            return {
                ...state,
                isRegInProgress: false,
                isUserExist: true
            };
        case actionTypes.REG_DOCTOR_SUCCESS:
            return {
                ...state,
                isRegInProgress: false,
                isRegistrationFinished: true
            };
        case actionTypes.REG_PATIENT_START:
            return {
                ...state,
                isRegInProgress: true
            };
        case actionTypes.REG_PATIENT_EXIST:
            return {
                ...state,
                isRegInProgress: false,
                isUserExist: true
            };
        case actionTypes.REG_PATIENT_SUCCESS:
            return {
                ...state,
                isRegInProgress: false,
                isRegistrationFinished: true
            };
        case actionTypes.RESET_REG_STATUS:
            return {
                ...state,
                isRegInProgress: false,
                isRegistrationFinished: false,
                isUserExist: false
            };
        case actionTypes.GET_SELECTOR_TOOL_TIP:
            return {
                ...state,
                selectorToolTip: action.selectorToolTip,
            };
            
        default: return state;
    }
};

export default reducer;