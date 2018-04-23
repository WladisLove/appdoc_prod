import * as actionTypes from '../actions/actionTypes'

let  profileDoctor = {
    id: '',
    "email": "",
    "fio": '',
    "phone": '',
    "sex": "",
    "datebirth": "",
    "educationsgroup1": [],
    "educationsgroup2": [],
    "worknow": [],
    "post": "doctor",
    "workdate": null,
    "category": "",
    "academicdegree": "",
    "academicdegreedoc": [], // зачем
    "academicstatus": [],
    "academicstatusdoc": "",
    "copycontract": [],
    "language": [],
    "consultationPrice": "",
    "isChildConsult": "",
    "isFreeConsult": "",
    "experience": "",
    "isworking":false,
    "active" :'',
    "avatar" : null,

};

const initialState = profileDoctor;

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SEND_NEW_INFO_DOCTOR:
            return {
                ...state
            };
        case actionTypes.INFO_DOCTOR:
            return {
                ...state,
                ...action.profileDoctor
            };

        default: return state;
    }
};

export default reducer;