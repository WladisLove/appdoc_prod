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
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_ALL_INTERVALS:
            return {
                ...state,
                schedules: action.intervals,
            }
        case actionTypes.GET_COUNT_NEAR_VISITS:
            return {
                ...state,
                nearVisits: action.nearVisits,
                nearVisitsLoaded: true
            }
        case actionTypes.GET_ALL_USER_VISITS:
            return {
                ...state,
                allUserVisits: action.allUserVisits,
            }
        case actionTypes.GET_INTERVALS_FOR_FREE_VISITS:
            return {
                ...state,
                freeVisitsIntervals: action.intervals,
            }

        case actionTypes.CLEAR_INTERVALS:
            return {
                ...state,
                schedules: [],
            }
        case actionTypes.CLEAR_VISITS:
            return {
                ...state,
                visits: [],
            }
        case actionTypes.GET_ALL_VISITS:
            return {
                ...state,
                visits: action.visits,
                visIntervals: action.intervals,
                min: action.min,
                max: action.max,
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