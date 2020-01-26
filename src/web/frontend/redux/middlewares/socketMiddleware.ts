import { Middleware } from 'redux';
import * as constants from '../constants';
import socket from '../../socket';

const SOCKET_INCOMING: string[] = [
  constants.UPDATE_PLAYERS,
  constants.START_TIMER,
  constants.STOP_TIMER,
  constants.UPDATE_WORD,
  constants.UPDATE_USER_COUNTER,
  constants.SET_HAND_CARDS,
  constants.SET_ROUND_CARDS,
  constants.SUBMITTED_CARDS_COUNTER,
  constants.SET_VOTES,
  constants.GAME_OVER,
  constants.GAME_STARTED,
  constants.START_ROUND,
  constants.TIME_TO_VOTE,
  constants.TIME_TO_PICK,
];
const SOCKET_OUTCOMING: string[] = [
  constants.REQUEST_PLAYERS,
  constants.LEAVE_ROOM,
  constants.JOIN_ROOM,
  constants.VOTE_CARD,
  constants.SUBMIT_CARD,
  constants.SUBMIT_WORD,
  constants.START_GAME,
  constants.CHAT_OPEN,
];

const socketMiddleware: Middleware = api => {
  SOCKET_INCOMING
    .forEach((type) => {
      socket.on(type, (payload: any) => {
        console.log('socket msg', type)
        api.dispatch({ type, payload })
      });
    });

  return next => action => {
    if (SOCKET_OUTCOMING.includes(action.type)) {
      console.log( action.payload, 'in middle')
      socket.emit(action.type, action.payload);
    }
    return next(action);
  }
};

export default socketMiddleware;