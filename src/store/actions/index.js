import axios from "axios";
import * as actionTypes from "./actionTypes";

export {
    getDocPatients,
    getPatientDoctors,
    getNotDocPatients,
    clearNotDocPatients,
    addPatient,
    addDoctor,
    removePatient,
    removeDoctor,
    getDateInterval,
    getDateIntervalWithoutMakingApp,
    setReception,
    setReceptionByPatient,
    selectPatient,
    unselectPatient,
    makeReview,
    getNotPatientDoctors,
    clearNotPatientDoctors,
    getSelectedPatientInfo,
    searchUsers,
    addOrDeleteUserFromSearch,
    sendMessage,
} from './patients';

export {
    getAllReviews,
    getAllReviewsByPatient,
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
    getAllPatientVisits,
    getCountNearVisits,
    getTodayVisits,
    getFreeVisitsBySpec,
} from './schedules';
export {
    getActualTreatments,
    getCompletedTreatments,
    getAllTreatments,
    getPaginationTreatments,
    getAppsBetweenDocAndUser,
    getCompletedApps,
    seletVisit,
    selectTreatment,
    clearSelections,
    completeReception,
    closeTreatment,
    uploadChatFile,
    uploadConclusion,
    getAllFilesTreatment,
    changeReceptionStatus,
    getReceptionDuration,
    clearCallback,
} from './treatment'


export {
    login,
    logout,
    registerDoctor,
    registerUser,
    resetRegisterStatus,
    setOnlineStatus,
    checkEmailAvailability
} from './auth'

export {
    getInfoPatient,
    sendNewInfoPatient,
    sendNewPasswordPatient,
    deleteAvatar,
    sendUserPoleValue,
    getUserInfoShort
} from './patientData'

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
    getAllDocIntervals,
    getDateWorkIntervalWithoutMakingAppAll
} from './doctorData'

export {
    loadingStart,
    loadingEnd
} from './loading'

export {
    setReceptionStatus,
    setChatFromId,
    setChatToId,
    setIsCallingStatus,
    setChatStory,
    setNewTimer,
    
} from './chatWS'