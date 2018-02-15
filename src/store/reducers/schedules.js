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
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        default: return state;
    }
};

export default reducer;