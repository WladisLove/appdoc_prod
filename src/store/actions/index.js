export {
    getDocPatients,
    getNotDocPatients,
    clearNotDocPatients,
    addPatient,
    removePatient,
    sendMessage,
} from './patients';
export {
    getAllReviews,
    putCommentAnswer,
    
} from './reviews';
export {

    addInterval,
    getAllIntervals,

    addVisit,
    getAllVisits,

    //--------
    selectEvent,
    deleteEvent,
    openCancelModal,
    closeCancelModal,
} from './schedules';