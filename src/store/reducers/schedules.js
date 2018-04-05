import * as actionTypes from '../actions/actionTypes'

const initialState = {
    schedules: [],
    visits: [],
    chosenData: {
        id: null,
        userName: '',
    },
    cancelModal: false,
    cancelData: {
        rangeSet: [],
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_ALL_INTERVALS:
            return {
                ...state,
                schedules: action.intervals,
            }
        case actionTypes.GET_ALL_VISITS:
            return {
                ...state,
                visits: action.visits,
            }








        case actionTypes.SELECT_EVENT:
            return {
                ...state,
                chosenData: {
                    id: action.event.id,
                    userName: action.event.title,
                }
            };
        case actionTypes.DELETE_EVENT:
            console.log('[Delete]', state.chosenData.id);
            return {
                ...state,
                chosenData: {
                    id: null,
                    userName: '',
                },
            };
        case actionTypes.OPEN_CANCEL_MODAL:
            return{
                ...state,
                cancelModal: true,
            };
        case actionTypes.CLOSE_CANCEL_MODAL:
            if(action.toSave){
                console.log('[SAVE]: ', action.object)
            }
            return{
                ...state,
                cancelModal: false,
                cancelData: {
                    rangeSet: [],
                }
            };
        default: return state;
    }
};

export default reducer;