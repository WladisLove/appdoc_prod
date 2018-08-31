import * as actionTypes from '../actions/actionTypes'

const FR_TREAT = 1,
    FR_VISIT = 2;

const initialState = {
    treatments: [],
    actualTreatments: [],
    visitInfo: {},
    treatInfo: {},
    from: 0,
    callback: null,
    treatmFiles: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_ALL_TREATMENTS:
            return {
                ...state,
                treatments: action.treatments,
            }
        case actionTypes.GET_TREATMENTS:
            return {
                ...state,
                treatments: action.treatments,
                treatmentsCount: action.treatmentsCount
            }
        case actionTypes.GET_ACTUAL_TREATMENTS:
            return {
                ...state,
                actualTreatments: action.treatments,
            }
        case actionTypes.GET_COMPLETED_TREATMENTS:
            return {
                ...state,
                completedTreatments: action.treatments,
            }
        case actionTypes.GET_COMPLETED_APPS:
            return {
                ...state,
                completedApps: action.completedApps,
                completedAppsLoaded: true
            }
        case actionTypes.APPS_BETWEEN_DOC_USER:
            return {
                ...state,
                appsBetween: action.appsBetween,
                appsBetweenCount: action.appsBetweenCount
            }

        case actionTypes.SELECT_VISIT:
            return {
                ...state,
                visitInfo: action.visitInfo,
                callback: action.callback,
                treatInfo: {},
                from: FR_VISIT,
                treatmFiles: [],
            }
        case actionTypes.SELECT_TREATMENT:
            return {
                ...state,
                treatInfo: action.treatInfo,
                visitInfo: {},
                from: FR_TREAT,
            }
        case actionTypes.CLEAR_VISIT_AND_TREAT: 
            return {
                ...state,
                from: 0,
                treatInfo: {},
                visitInfo: {},
                treatmFiles: [],
            }
        case actionTypes.GET_TREATMENT_FILES: 
            return {
                ...state,
                treatmFiles: action.files,
            }
        case actionTypes.CLEAR_CALLBACK:
            return {
                ...state,
                callback: null,
            }
        default: return state;
    }
};

export default reducer;