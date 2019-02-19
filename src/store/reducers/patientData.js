import * as actionTypes from '../actions/actionTypes'

let  profilePatient = {
    id: '',
    "email": "",
    "fio": '',
    "phone": '',
    "sex": "",
    "active" :'1',
    "avatar" : null,
    "chronic" : [],
    "latitude" : null,
    "longitude" : null
};

let userInfoShort = {
    "PatientAge": 0,
    "PatientWeight": "",
    "PatientHeight": "",
    "PatientPressure": "",
    "PatientPulse": ""
};

const initialState = {...profilePatient, ...userInfoShort};

const reducer = (state = initialState, action) => {
    switch (action.type){
        // case actionTypes.SEND_NEW_INFO_DOCTOR:
        //     return {
        //         ...state
        //     };
        case actionTypes.INFO_PATIENT:
            return {
                ...state,
                ...action.profilePatient
            };

        case actionTypes.SEND_USER_POLE_VALUE:
            return {
                ...state,
                ["Patient" + action.pole]: action.value
            };

        case actionTypes.GET_USER_INFO_SHORT:
            return {
                ...state,
                ...action.userInfoShort
            };
        case actionTypes.SAVE_GEOLOCATION:
            return {
                ...state,
                latitude: action.latitude,
                longitude: action.longitude
            };
            

        default: return state;
    }
};

export default reducer;