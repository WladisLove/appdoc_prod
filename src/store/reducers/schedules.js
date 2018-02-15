import * as actionTypes from '../actions/actionTypes'

const initialState = {
    events: [
        {
            id: 6,
            title: 'Иванова Александра',
            start: new Date(2018, 1, 12, 10, 30, 0, 0),
            end: new Date(2018, 1, 12, 10, 50, 0, 0),
            desc: 'Pre-meeting meeting, to prepare for the meeting',
        },
        {
            id: 7,
            title: 'Иванова Александра',
            start: new Date(2018, 1, 11, 12, 0, 0, 0),
            end: new Date(2018, 1, 11, 12, 10, 0, 0),
            desc: 'Power lunch',
        },
        {
            id: 8,
            title: 'Иванова Александра',
            start: new Date(2018, 1, 12, 9, 0, 0, 0),
            end: new Date(2018, 1, 12, 9, 10, 0, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 9,
            title: 'Иванова Александра',
            start: new Date(2018, 1, 12, 9, 30, 0, 0),
            end: new Date(2018, 1, 12, 9, 35, 0, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 10,
            title: 'Иванова Александра',
            start: new Date(2018, 1, 12, 10, 0, 0, 0),
            end: new Date(2018, 1, 12, 10, 5, 0, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 11,
            title: 'Иванова-Петрова Александра',
            start: new Date(2018, 1, 13, 9, 0, 0),
            end: new Date(2018, 1, 13, 9, 5, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 12,
            title: 'Иванова Александра',
            start: new Date(2018, 1, 24, 8, 0, 0),
            end: new Date(2018, 1, 24, 8, 10, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 13,
            title: 'Иванова Александра',
            start: new Date(2018, 1, 27, 8, 10, 0),
            end: new Date(2018, 1, 27, 8, 15, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 14,
            title: 'Петров Виталий',
            start: new Date(2018, 1, 5, 8, 40, 0),
            end: new Date(2018, 1, 5, 8, 50, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 15,
            title: 'Непетров Виталий',
            start: new Date(2018, 1, 1, 9, 0, 0),
            end: new Date(2018, 1, 1, 9, 15, 0),
            desc: 'Most important meal of the day',
        },
    ],
    schedules: [
        {
            id: 12,
            isEditable: false,
            time: [{
                start: new Date(2018, 0, 15, 8, 30, 0),
                end: new Date(2018, 0, 15, 10, 0, 0),
            }, {
                start: new Date(2018, 0, 15, 12, 0, 0),
                end: new Date(2018, 0, 15, 13, 30, 0),
            }, {
                start: new Date(2018, 0, 15, 18, 0, 0),
                end: new Date(2018, 0, 15, 19, 0, 0),
            }],
            emergencyTime: [],
        },
        {
            id: 12,
            isEditable: false,
            time: [{
                start: new Date(2018, 0, 25, 8, 30, 0),
                end: new Date(2018, 0, 25, 10, 0, 0),
            }, {
                start: new Date(2018, 0, 25, 12, 0, 0),
                end: new Date(2018, 0, 25, 13, 30, 0),
            }, {
                start: new Date(2018, 0, 25, 18, 0, 0),
                end: new Date(2018, 0, 25, 19, 0, 0),
            }],
            emergencyTime: [],
        },
        {
            id: 13,
            isEditable: true,
            time: [{
                start: new Date(2018, 1, 8, 8, 30, 0),
                end: new Date(2018, 1, 8, 9, 30, 0),
            }, {
                start: new Date(2018, 1, 8, 13, 0, 0),
                end: new Date(2018, 1, 8, 18, 30, 0),
            }],
            emergencyTime: [{
                start: new Date(2018, 1, 8, 14, 30, 0),
                end: new Date(2018, 1, 8, 15, 0, 0),
            }, {
                start: new Date(2018, 1, 8, 17, 0, 0),
                end: new Date(2018, 1, 8, 17, 30, 0),
            }],
        },
        {
            id: 15,
            isEditable: false,
            time: [{
                start: new Date(2018, 1, 7, 8, 30, 0),
                end: new Date(2018, 1, 7, 9, 30, 0),
            }, {
                start: new Date(2018, 1, 7, 13, 0, 0),
                end: new Date(2018, 1, 7, 18, 30, 0),
            }],
            emergencyTime: [{
                start: new Date(2018, 1, 7, 17, 0, 0),
                end: new Date(2018, 1, 7, 17, 30, 0),
            }],
        },
    ],
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
        case actionTypes.SELECT_EVENT:
            return {
                ...state,
                chosenData: {
                    id: action.event.id,
                    userName: action.event.title,
                }
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