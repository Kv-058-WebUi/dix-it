import {combineReducers} from 'redux'
import testReducer from './test'
import getDataReducer from './getDataReducer'

const combineReducer = combineReducers({
   testReducer,
   getDataReducer
});

export default combineReducer;
