import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import patientsReducer from './reducers/patients'
import reviewsReducer from './reducers/reviews'
import schedulesReducer from './reducers/schedules'
import treatmentsReducer from './reducers/treatment'
import authReducer from './reducers/auth'
import doctorReducer from './reducers/doctor'
import infoDoctorReducer from './reducers/doctorData'
import infoPatientReducer from './reducers/patientData'
import chatWSReducer from './reducers/chatWS'
import loadingReducer from './reducers/loading'
import geolocation from './reducers/geolocation'
import chatContentState from './reducers/chatContentState'


const rootReducer = combineReducers({
    patients: patientsReducer,
    reviews: reviewsReducer,
    schedules: schedulesReducer,
    treatments: treatmentsReducer,
    auth: authReducer,
    doctor: doctorReducer,
    profileDoctor: infoDoctorReducer,
    profilePatient: infoPatientReducer,
    chatWS: chatWSReducer,
    loading: loadingReducer,
    geolocation: geolocation,
    chatState: chatContentState,
});

export default function configureStore() {
    return createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));
}