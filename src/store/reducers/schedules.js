import * as actionTypes from '../actions/actionTypes'

const initialState = {
    schedules: [],
    visits: [],
    visIntervals: [],
    min: 0,
    max: 0,
    chosenData: {
        id: null,
        userName: '',
    },
    cancelData: {
        rangeSet: [],
    },
    visitInfo: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_ALL_INTERVALS:
            return {
                ...state,
                schedules: action.intervals,
            }
        case actionTypes.CLEAR_INTERVALS:
            return {
                ...state,
                schedules: [],
                visitInfo: {},
            }
        case actionTypes.GET_ALL_VISITS:
            return {
                ...state,
                visits: action.visits,
                visIntervals: action.intervals,
                min: action.min,
                max: action.max,
            }
        case actionTypes.SELECT_VISIT:
            return {
                ...state,
                visitInfo: action.visitInfo,
            }
        case actionTypes.DELETE_EVENT:
            return {
                ...state,
                chosenData: {
                    id: 0,
                    userName: '',
                },
            };







        case actionTypes.SELECT_EVENT:
            return {
                ...state,
                chosenData: {
                    id: action.event.id,
                    userName: action.event.fio,
                }
            };
        
        case actionTypes.CLOSE_CANCEL_MODAL:
            return{
                ...state,
                cancelData: {
                    rangeSet: [],
                }
            };
        default: return state;
    }
};

export default reducer;