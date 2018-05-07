export {
    getDocPatients,
    getNotDocPatients,
    clearNotDocPatients,
    addPatient,
    removePatient,

    selectPatient,
    unselectPatient,

    getSelectedPatientInfo,
    
    sendMessage,
} from './patients';

export {
    getAllReviews,
    putCommentAnswer,
    
} from './reviews';

export {
    selectEvent,
    deleteEvent,
    cancelEventsRange,

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
    logout,
} from './auth'

export {
    getDocTodayInfo,
    getDocShortInfo,
} from './doctor'

export {
    getInfoDoctor,
    sendNewInfoDoctor,
} from './doctorData';