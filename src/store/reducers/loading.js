import * as actionTypes from '../actions/actionTypes'


const reducer = (state, action) => {
    switch (action.type){
        case actionTypes.LOADING_START:
            return {
                ...state,
                [action.loader]: true
            };
        case actionTypes.LOADING_END:
            return {
                ...state,
                [action.loader]: false
            };

        default: return state;

    }
};

export default reducer;