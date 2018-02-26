import * as actionTypes from '../actions/actionTypes'

const initialState = {
    
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.REGISTER_DOCTOR:
            console.log('[REGISTER_DOCTOR]', action.info);
            return {
                ...state,
            };
        default: return state;
    }
}

export default reducer;