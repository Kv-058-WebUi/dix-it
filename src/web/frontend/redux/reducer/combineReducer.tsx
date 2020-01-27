import {combineReducers} from 'redux'
import gamePageStore, { GamePageStoreInterface } from "./gamePageReducer"
import appStore, { AppStoreInterface } from "./appReducer"
export interface CombinedStateInterface {
   gamePageStore: GamePageStoreInterface,
   appStore: AppStoreInterface,
}

const combineReducer = combineReducers<CombinedStateInterface>({
   gamePageStore,
   appStore
});

export default combineReducer;
