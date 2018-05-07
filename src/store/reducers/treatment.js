import * as actionTypes from '../actions/actionTypes'

const initialState = {
    treatments: [],
    actualTreatments: [],

    choosenReceptionId: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_ALL_TREATMENTS:
            return {
                ...state,
                treatments: action.treatments,
            }
        case actionTypes.GET_ACTUAL_TREATMENTS:
            return {
                ...state,
                actualTreatments: action.treatments,
            }
        default: return state;
    }
};

export default reducer;