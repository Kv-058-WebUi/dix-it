import io from "socket.io-client";

const socket = io(process.env.SERVER_URL+':'+process.env.SERVER_PORT);
// const socket = io(`${process.env.CLIENT_URL}`); //for build server

export default socket;