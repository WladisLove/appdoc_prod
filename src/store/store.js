import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import patientsReducer from './reducers/patients'
import reviewsReducer from './reducers/reviews'


const rootReducer = combineReducers({
    patients: patientsReducer,
    reviews: reviewsReducer,
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


export default function configureStore() {
    return createStore(rootReducer, composeEnhancers(
        applyMiddleware(thunk)
    ));
}