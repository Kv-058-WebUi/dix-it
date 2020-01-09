import { Middleware } from 'redux';
import { updatePlayers, requestPlayers } from '../constants';
import socket from '../../socket';

const SOCKET_INCOMING: string[] = [
  updatePlayers
];
const SOCKET_OUTCOMING: string[] = [
  requestPlayers
];

const socketMiddleware: Middleware = api => {
  SOCKET_INCOMING
    .forEach((type) => {
      socket.on(type, (payload: any) => {
        console.log('socket msg', payload)
        api.dispatch({ type, payload })
      });
    });

  return next => action => {
    if (SOCKET_OUTCOMING.includes(action.type)) {
      socket.emit(action.type, action.payload);
    }
    return next(action);
  }
};

export default socketMiddleware;