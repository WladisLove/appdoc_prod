import * as actionTypes from '../actions/actionTypes'

let  profileDoctor = {
    id: '',
    "email": "",
    "fio": '',
    "phone": '',
    "sex": "",
    "datebirth": null,
    "educationsgroup1": [],
    "educationsgroup2": [],
    "worknow": [],
    "post": "doctor",
    "workdate": null,
    "category": null,
    "academicdegree": null,
    "academicdegreedoc": [],
    "academicstatus":  null,
    "academicstatusdoc": [],
    "copycontract": [],
    "language": [],//11 - возникает rp-c elemnt ошибка если ""
    "consultationPrice": null,
    "isChildConsult": false,
    "isFreeConsult":false,
    "experience": null,
    "isworking":false,
    "active" :'1',
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