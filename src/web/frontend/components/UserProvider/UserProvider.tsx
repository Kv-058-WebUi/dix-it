import React, { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { DixitUser } from "../../../backend/entities/User";
import { JwtPayload } from '../../../backend/authentication/helpers';
import axios from "axios";

type UserData = {
  authenticated: boolean,
  nickname: null | DixitUser['nickname'],
  user_id: null | DixitUser['user_id'],
  profile_picture: null | DixitUser['profile_picture']
}

type ContextData = {
  user: null | UserData
}

const contextProps: ContextData = {
  user: null
}

const context = createContext(contextProps);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserData>({
      authenticated: false,
      nickname: null,
      user_id: null,
      profile_picture: null
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    axios.post('/api/auth/isAuthenticated', null, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        if (res.data.authenticated) {
          axios.defaults.headers.common["Authorization"] = token;
          if(token) {
            const decoded: JwtPayload = jwt_decode(token);

            setUser({
              authenticated: true,
              nickname: decoded.nickname,
              user_id: decoded.user_id,
              profile_picture: decoded.profile_picture 
            });
          }
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
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