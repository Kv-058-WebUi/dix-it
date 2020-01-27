import io from "socket.io-client";
import { CURRENT_ENV, ENV_DEV } from '../../config';

const socketUrl = CURRENT_ENV === ENV_DEV 
  ? process.env.SERVER_URL+':'+process.env.SERVER_PORT
  : `${process.env.CLIENT_URL}`;
const socket = io(socketUrl);

export default socket;