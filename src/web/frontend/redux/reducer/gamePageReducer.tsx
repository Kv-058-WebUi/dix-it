import * as constants from "../constants";
import { CardType } from "../../components/GameBoard/GameBoard";
import { reloadPlayer as reloadPlayerAction } from '../actions/reloadPlayer';
import { ROOM_STATUSES, RoomData } from '../../../common/helpers';

export interface GamePlayer {
    img: string,
    score: number,
    name: string,
    inGame: boolean,
    player_id: number,
    color: string
}

export interface Vote {
    card: CardType,
    voters: Array<GamePlayer>,
    player: GamePlayer,
}

export interface GamePageStoreInterface {
    roomHash: string,
    maxPlayers: number,
    word: string,
    handCards: Array<CardType>,
    roundCards: Array<CardType>,
    votes: Array<Vote>,
    timer: number,
    canStartGame: boolean,
    canSubmitWord: boolean,
    canSubmitCard: boolean,
    canVoteCard: boolean,
    showCalltoAction: boolean,
    callToActionText: string,
    gameStatus: ROOM_STATUSES,
    submittedCardsCounter: number,
    submittedCardId?: number,
    player_id?: number,
    creator_id?: number,
    storyteller?: GamePlayer,
    gamePage: {
        gamePlayers: GamePlayer[],
        isModalShown: boolean
    }
}

//TODO get room hash from url
const gamePageInitStore: GamePageStoreInterface = {
    roomHash: '',
    maxPlayers: 5,
    word: '',
    handCards: [],
    roundCards: [],
    votes: [],
    timer: 100,
    canStartGame: false,
    canSubmitWord: false,
    canSubmitCard: false,
    canVoteCard: false,
    showCalltoAction: false,
    callToActionText: '',
    gameStatus: ROOM_STATUSES.WAITING,
    submittedCardsCounter: 0,
    gamePage: {
        gamePlayers: [],
        isModalShown: false
    }
};

function initStore(state: GamePageStoreInterface): GamePageStoreInterface {
    return state;
}

function showWinner(state: GamePageStoreInterface): GamePageStoreInterface {
    return {
        ...state,
        gamePage: {
            ...state.gamePage,
            isModalShown: true
        }
    };
}

function hideWinner(state: GamePageStoreInterface): GamePageStoreInterface {
    return {
        ...state,
        gamePage: {
            ...state.gamePage,
            isModalShown: false
        }
    };
}

function updatePlayers(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    return updatePermissions({
        ...state,
        gamePage: {
            ...state.gamePage,
            gamePlayers: action.payload.players
        }
    });
}

function updateWord(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    return {
        ...state,
        word: action.payload.word
    };
}

function updateHandCards(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    return {
        ...state,
        handCards: action.payload.handCards
    };
}

function updateRoundCards(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    return {
        ...state,
        roundCards: action.payload.roundCards
    };
}

function updateVotes(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    return {
        ...state,
        votes: action.payload.votes
    };
}

function updateCardsCounter(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    return {
        ...state,
        submittedCardsCounter: action.payload.submittedCardsCounter
    };
}

function startTimer(state: GamePageStoreInterface): GamePageStoreInterface {
    return {
        ...state,
        timer: 0
    };
}

function stopTimer(state: GamePageStoreInterface): GamePageStoreInterface {
    return {
        ...state,
        timer: 100,
        canSubmitCard: false,
        canSubmitWord: false,
        canVoteCard: false,
        showCalltoAction: false,
        callToActionText: ''
    };
}

function gameOver(state: GamePageStoreInterface): GamePageStoreInterface {
    return {
        ...state,
        timer: 100,
        canSubmitCard: false,
        canSubmitWord: false,
        canVoteCard: false,
        gameStatus: ROOM_STATUSES.FINISHED
    };
}

function gameStarted(state: GamePageStoreInterface): GamePageStoreInterface {
    return updatePermissions({
        ...state,
        gameStatus: ROOM_STATUSES.STARTED
    });
}

function startRound(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    const player_id = state.player_id || reloadPlayerAction().payload.player_id;
    const canSubmitCard = player_id == action.payload.storyteller.player_id;
    const callToActionText = player_id == action.payload.storyteller.player_id ? 'Pick a card': 'Storyteller picks a card';
    return {
        ...state,
        word: '',
        storyteller: action.payload.storyteller,
        canSubmitCard,
        submittedCardId: undefined,
        showCalltoAction: true,
        callToActionText
    };
}

function reloadPlayer(state: GamePageStoreInterface, action: any): GamePageStoreInterface {

    return updatePermissions({
        ...state,
        player_id: action.payload.player_id,
    });
}

function submitCard(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    const canSubmitWord = state.player_id == state.storyteller?.player_id;
    const card = action.payload.card as CardType;

    return {
        ...state,
        canSubmitCard: false,
        canSubmitWord,
        showCalltoAction: canSubmitWord,
        submittedCardId: card.card_id,
        callToActionText: ''
    };
}

function submitWord(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    return {
        ...state,
        canSubmitWord: false
    };
}

function timeToPick(state: GamePageStoreInterface): GamePageStoreInterface {
    const canSubmitCard = state.player_id != state.storyteller?.player_id;
    return {
        ...state,
        canSubmitCard,
        showCalltoAction: canSubmitCard,
        callToActionText: canSubmitCard ? 'Pick a card' : ''
    };
}

function timeToVote(state: GamePageStoreInterface): GamePageStoreInterface {
    return {
        ...state,
        canVoteCard: state.player_id != state.storyteller?.player_id,
        showCalltoAction: true,
        callToActionText: 'Time to vote'
    };
}

function joinRoom(state: GamePageStoreInterface, action: any): GamePageStoreInterface {
    const roomData = action.payload.room as RoomData;

    return updatePermissions({
        ...gamePageInitStore,
        storyteller: undefined,
        player_id: state.player_id,
        creator_id: roomData.creator.player_id,
        roomHash: roomData.room_code,
        maxPlayers: roomData.max_players,
        showCalltoAction: true,
        callToActionText: 'Waiting for players'
    })
}

function voteCard(state: GamePageStoreInterface): GamePageStoreInterface {
    return {
        ...state,
        canVoteCard: false
    }
}

function updatePermissions(state: GamePageStoreInterface): GamePageStoreInterface {
    const isCreator =state.player_id == state.creator_id;
    const isRoomWaiting = state.gameStatus === ROOM_STATUSES.WAITING;
    const isEnoughPlayers = state.gamePage.gamePlayers.filter(player => player.inGame).length > 2;
    let {callToActionText, showCalltoAction} = state;

    if(showCalltoAction && isRoomWaiting) {
        if(isEnoughPlayers && !isCreator) {
            callToActionText = 'Game ready to start';
        } else {
            callToActionText = 'Waiting for players';
        }
    }

    return {
        ...state,
        canStartGame: isCreator && isRoomWaiting && isEnoughPlayers,
        callToActionText
    }
}

function gamePageStore(state = gamePageInitStore, action: any) {
    switch (action.type) {
        case constants.INIT_STORE:
            return initStore(state);
        case constants.SHOW_WINNER:
            return showWinner(state);
        case constants.HIDE_WINNER:
            return hideWinner(state);
        case constants.UPDATE_PLAYERS:
            return updatePlayers(state, action);
        case constants.UPDATE_WORD:
            return updateWord(state, action);
        case constants.START_TIMER:
            return startTimer(state);
        case constants.STOP_TIMER:
            return stopTimer(state);
        case constants.SUBMITTED_CARDS_COUNTER:
            return updateCardsCounter(state, action);
        case constants.SET_HAND_CARDS:
            return updateHandCards(state, action);
        case constants.SET_ROUND_CARDS:
            return updateRoundCards(state, action);
        case constants.SET_VOTES:
            return updateVotes(state, action);
        case constants.GAME_OVER:
            return gameOver(state);
        case constants.GAME_STARTED:
            return gameStarted(state);
        case constants.RELOAD_PLAYER:
            return reloadPlayer(state, action);
        case constants.SUBMIT_CARD:
            return submitCard(state, action);
        case constants.SUBMIT_WORD:
            return submitWord(state, action);
        case constants.START_ROUND:
            return startRound(state, action);
        case constants.TIME_TO_VOTE:
            return timeToVote(state);
        case constants.TIME_TO_PICK:
            return timeToPick(state);
        case constants.JOIN_ROOM:
            return joinRoom(state, action);
        case constants.VOTE_CARD:
            return voteCard(state);
        default:
            return state
    }
}

function permissionMiddleware(state: any, action: any) {
    return updatePermissions(gamePageStore(state, action));
}

export default permissionMiddleware;
