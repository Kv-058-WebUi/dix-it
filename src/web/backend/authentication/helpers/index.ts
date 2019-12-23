import { DixitUser } from '../../entities/User';

export type LoginUserData = {
  login: string,
  password: string
}

export type JwtPayload = {
  user_id: DixitUser['user_id'],
  profile_picture: DixitUser['profile_picture'],
  nickname: DixitUser['nickname']
}