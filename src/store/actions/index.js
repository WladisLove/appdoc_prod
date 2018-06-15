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
    clearIntervals,
    addInterval,
    addVisit,
    getAllVisits,
    getTodayVisits,
} from './schedules';
export {
    getActualTreatments,
    getAllTreatments,
    seletVisit,
    selectTreatment,
    clearSelections,

    completeReception,
    closeTreatment,
} from './treatment'


export {
    login,
    logout,
} from './auth'

export {
    getDocTodayInfo,
    getDocShortInfo,
    setExIntervalInfo,
    switchExInterval,
} from './doctor'

export {
    sendNewInfoDoctor,
    getInfoDoctor,
    getNotifications,
    readNotification,
} from './doctorData'