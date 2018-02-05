import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patients: [],
    currentId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        default: return state;
    }
}

export default reducer;