import { UPDATE_USER_COUNTER } from "../constants";

export interface AppStoreInterface {
    onlineUsersCounter: number,
}

function updateOnlineUsersCounter(state: AppStoreInterface, action: any) {
    return {
        ...state,
        onlineUsersCounter: action.payload.onlineUsersCounter
    };
}

const appInitStore: AppStoreInterface = {
    onlineUsersCounter: 0,
}

function appStore(state = appInitStore, action: any) {
    switch (action.type) {
        case UPDATE_USER_COUNTER:
            return updateOnlineUsersCounter(state, action);
        default:
            return state
    }
}

export default appStore;
