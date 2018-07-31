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
};

const initialState = profilePatient;

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

        default: return state;
    }
};

export default reducer;