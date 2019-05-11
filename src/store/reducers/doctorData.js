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
    "works": [],
    "workIntervals": [],
    "docIntervalsWithAppsAll": []
};

let specialAndLanguage = {
    specs: [],
    langs: []

}

const initialState = profileDoctor;

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SEND_NEW_INFO_DOCTOR:
            return {
                ...state
            };
        case actionTypes.INFO_DOCTOR:
            let language = [];

            console.log('specialAndLanguage', specialAndLanguage)
            if(specialAndLanguage.langs.length){
                    specialAndLanguage.langs.forEach((el) => {
                        
                         action.profileDoctor.language.includes(el.id) ? language.push(el) : null
                    })
                    action.profileDoctor.language = language;

            }
            
            if(specialAndLanguage.specs.length){
                specialAndLanguage.specs.forEach((el) => {
                       
                        action.profileDoctor.educationsgroup1.forEach((elem, index) => {

                                if(elem.speciality.length){
                                    elem.speciality.forEach((element, i) => {   
                                       
                                        (el.id == element || el.title == element) ? action.profileDoctor.educationsgroup1[index].speciality[i] = el : null
                                    })
                                }
                                
                        })
                     })
            }

            return {
                ...state,
                ...action.profileDoctor
            };
        case actionTypes.GET_ALL_DOC_INTERVALS:
            return {
                ...state,
                workIntervals: action.intervalsDoctor
            };
        case actionTypes.DOC_INTERVALS_WITH_APPS_ALL:
            return {
                ...state,
                docIntervalsWithAppsAll: action.intervals
            };
        case actionTypes.GET_DOCTOR_SPECIALITIES:
            specialAndLanguage.specs = [...action.docSpecialities]
            console.log('2specialAndLanguage', specialAndLanguage)
            if(specialAndLanguage.specs.length && state.educationsgroup1.length){
                specialAndLanguage.specs.forEach((el) => {
                        state.educationsgroup1.forEach((elem, index) => {

                            if(elem.speciality.length){
                                elem.speciality.forEach((element, i) => {                  
                                        (el.id == element || el.title == element) ? state.educationsgroup1[index].speciality[i] = el : null
                                })
                            }
                            
                        })
                     })
            }
            return {
                ...state
            };

        case actionTypes.GET_AVAIL_LANGUAGES:

        
            let languageB = [];
            specialAndLanguage.langs = [...action.availLanguages];
            
            if(specialAndLanguage.langs.length){
                specialAndLanguage.langs.forEach((el) => {        
                        
                        !state.language.includes(el.id) ? languageB.push(el) : null
                })
            }
            
            return {
                ...state,
                language: languageB
            };
            
        default: return state;
    }
};

export default reducer;