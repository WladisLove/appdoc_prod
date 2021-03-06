import * as actionTypes from '../actions/actionTypes'

const initialState = {
    from: 0,
    to: 0,
    receptionStarts: false,
    isCalling: false,
    chatStory: [],
    status: false,
    timer: {
        s: 0,
        m: 0,
        h: 0,
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_RECEPTION_ISSTART:
            return {
                ...state,
                receptionStarts: action.isStart,
            }
        case actionTypes.SET_RECEPTION_ISCALLING:
            return {
                ...state,
                isCalling: action.isCalling,
            }
        case actionTypes.SET_CHAT_FROM_ID:
            return {
                ...state,
                from: action.id,
            }
        case actionTypes.SET_CHAT_TO_ID:
            return {
                ...state,
                to: action.id,
            }
        case actionTypes.SET_CHAT_STORY:
            return {
                ...state,
                chatStory: action.chat,
            }
        case actionTypes.SET_NEW_TIMER:
            return {
                ...state,
                timer: action.timer,
            }
        case actionTypes.SET_USER_STATUS:
                return {
                    ...state,
                    status: action.status,
            }      
        case actionTypes.GET_PATIENT_LOCATION:
            return {
                ...state,
                patientLocation: action.location,
            }

        default: return state;
    }
};

export default reducer;