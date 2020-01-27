import React, { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { DixitUser } from "../../../backend/entities/User";
import { Player } from "../../../backend/entities/Player";
import axios from "axios";
import cookie from "cookie";
import { JwtPayload } from "../../../common/helpers";

export type UserData = {
  authenticated: boolean,
  nickname: DixitUser['nickname'],
  user_id?: DixitUser['user_id'],
  email: DixitUser['email'],
  lastonline: DixitUser['lastonline'],
  created_at: DixitUser['created_at'],
  player_id: Player['player_id'],
  is_banned: boolean,
  profile_picture: DixitUser['profile_picture']
}

export type ContextData = {
  user: UserData | null,
  updateContext: () => void
}

let defaultUser: UserData | null = null;
let token = localStorage.getItem('jwt_token');

if(token) {
  let jwtData : JwtPayload = jwt_decode(token);
  
  defaultUser = {
    ...jwtData,
    created_at: new Date(jwtData.created_at),
    lastonline: new Date(jwtData.lastonline),
  };
}

const contextProps: ContextData = {
  user: defaultUser,
  updateContext: () => {}
}

const context = createContext(contextProps);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserData | null>(defaultUser);

  function updateContext() {
    let cookies = cookie.parse(document.cookie);
    
    if(cookies.oauth_jwt_token) {
      localStorage.setItem('jwt_token', cookies.oauth_jwt_token);
      document.cookie = "oauth_jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    token = localStorage.getItem('jwt_token');

    axios.post('/api/auth/user', null, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        const decoded: JwtPayload = jwt_decode(res.data.jwt_token);
        const mapped : UserData = {
          ...decoded,
          created_at: new Date(decoded.created_at),
          lastonline: new Date(),
        };
      
        if(mapped === defaultUser) {
          return;
        }

        if (decoded.authenticated) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.jwt_token}`;
          localStorage.setItem('jwt_token', res.data.jwt_token);
        }
        setUser(mapped);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    updateContext();
  }, []);

  return (
    <context.Provider value={{user, updateContext}}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;