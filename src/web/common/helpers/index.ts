import { DixitUser } from "../../backend/entities/User";
import { Player } from "../../backend/entities/Player";
import jwt_decode from 'jwt-decode';

export enum ROOM_STATUSES {
  STARTED = 1,
  WAITING = 2,
  FINISHED = 3
}

export type LoginUserData = {
  login: string,
  password: string
}

export type JwtPayload = {
  user_id?: DixitUser['user_id'],
  profile_picture: DixitUser['profile_picture'],
  nickname: DixitUser['nickname'],
  player_id: Player['player_id'],
  authenticated: boolean,
  is_banned: DixitUser['is_banned'],
  email: DixitUser['email'],
  created_at: string,
  lastonline: string,
  roles: string[]
}

export type RoomData = {
  name: string,
  room_code: string,
  max_players: number,
  active_players: number,
  is_private: boolean,
  creator: {
    player_id: number,
    nickname: string
  },
  status_code: number
}

export function getJwtData() : JwtPayload | undefined {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    return jwt_decode(token);
  }
}

// Fisher–Yates shuffle in place
export function shuffle<T>(array: Array<T>): Array<T> {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];

      array[i] = array[j];
      array[j] = tmp;
  }
  return array;
}

export const turnTimeMs = 30000;

