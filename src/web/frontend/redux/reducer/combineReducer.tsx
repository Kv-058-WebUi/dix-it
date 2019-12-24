import {combineReducers} from 'redux'
import testReducer from './test'
import getDataReducer from './getDataReducer'

const initState = {
   showSubmitButton: false,
   showCard: true
};

const combineReducer = combineReducers({
   testReducer,
   getDataReducer
});

export default function rootReducer(state = initState, action:any) {
   return state
}
