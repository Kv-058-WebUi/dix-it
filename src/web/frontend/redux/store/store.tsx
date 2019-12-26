import {createStore, applyMiddleware, compose} from 'redux'
import combineReducer from '../reducer/combineReducer'
import thunk from "redux-thunk";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
