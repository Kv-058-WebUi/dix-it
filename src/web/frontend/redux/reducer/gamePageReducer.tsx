import {initStore, showWinner, hideWinner, updatePlayers} from "../constants";

const gamePageInitStore = {
    showSubmitButton: false,
    showCard: true,
    gamePage: {
        gamePlayers: [],
        isModalShown: false
    }
};

function gamePageStore(state = gamePageInitStore, action:any) {
    switch(action.type) {
        case initStore:
            return state;
        case showWinner:
            const newState = {...state};
            newState.gamePage.isModalShown = true;
            return newState;
        case hideWinner:
            const hideState = {...state};
            hideState.gamePage.isModalShown = false;
            return hideState;
        case updatePlayers:
            return {
                ...state,
                gamePage: {
                    ...state.gamePage,
                    gamePlayers: action.payload.players
                }
            };
        default:
            return state
    }
}

export default gamePageStore;
