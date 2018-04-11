import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import patientsReducer from './reducers/patients'
import reviewsReducer from './reducers/reviews'
import schedulesReducer from './reducers/schedules'
import treatmentsReducer from './reducers/treatment'
import authReducer from './reducers/auth'
import doctorReducer from './reducers/doctor'



const rootReducer = combineReducers({
    patients: patientsReducer,
    reviews: reviewsReducer,
    schedules: schedulesReducer,
    treatments: treatmentsReducer,
    auth: authReducer,
    doctor: doctorReducer,
});

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


// export default function configureStore() {
//     return createStore(rootReducer, composeEnhancers(
//         applyMiddleware(thunk)
//     ));
// }

export default function configureStore() {
    return createStore(rootReducer, applyMiddleware(thunk));
}