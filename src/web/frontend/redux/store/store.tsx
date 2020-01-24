import { createStore, applyMiddleware, compose } from 'redux'
import socketMiddleware from '../middlewares/socketMiddleware';
import combineReducer from '../reducer/combineReducer'
import thunk from "redux-thunk";
import { requestPlayers } from '../actions/requestPlayers';
import { reloadPlayer } from '../actions/reloadPlayer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducer,
    composeEnhancers(
        applyMiddleware(
            thunk,
            socketMiddleware
        )
    )
);

store.dispatch(reloadPlayer());
store.dispatch(requestPlayers());

export default store;
