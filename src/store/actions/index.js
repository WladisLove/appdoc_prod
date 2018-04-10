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
    selectEvent,
    deleteEvent,
    openCancelModal,
    closeCancelModal,

    getAllIntervals,
    addInterval,
    addVisit,
    getAllVisits,
} from './schedules';
export {
    getActualTreatments,
    getAllTreatments,
} from './treatment'


export {
    login,
} from './auth'
