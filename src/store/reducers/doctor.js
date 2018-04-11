import * as actionTypes from '../actions/actionTypes'

const initialState = {
    todayInfo: {},
    shortInfo: {},
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
            
        default: return state;
    }
};

export default reducer;