import React, { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { DixitUser } from "../../../backend/entities/User";
import { Player } from "../../../backend/entities/Player";
import { JwtPayload } from '../../../backend/authentication/helpers';
import axios from "axios";

type UserData = {
  authenticated: boolean,
  nickname: DixitUser['nickname'],
  user_id?: DixitUser['user_id'],
  player_id?: Player['player_id'],
  profile_picture: DixitUser['profile_picture']
}

type ContextData = {
  user: UserData
}

const dummyUser = {
  authenticated: false,
  nickname: 'Guest',
  profile_picture: 'anonymous_user.png'
}

const contextProps: ContextData = {
  user: dummyUser
}

const context = createContext(contextProps);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserData>(dummyUser);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    axios.post('/api/auth/getUser', null, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        const decoded: JwtPayload = jwt_decode(res.data.jwt_token);

        if (decoded.authenticated) {
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.setItem('jwt_token', res.data.jwt_token);
        }
        setUser(decoded);
        console.log(decoded);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <context.Provider value={{user}}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;