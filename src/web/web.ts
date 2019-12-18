import express from "express";
import http, {Server} from "http";
import path from "path";
import RoomController from "./backend/controllers/room.controller";
import Controller from './backend/interfaces/controller.interface';
import AuthenticationController from "./backend/authentication/authentication.controller";
import bodyParser from "body-parser";
import { UserController } from "./backend/controllers/user.controller";
import cors from "cors";
import io from "socket.io"
import SocketIO from "socket.io";

class App {
  public app: express.Application;
  private server: Server;
  private socket: SocketIO.Server;
  // Express app initialization
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.server.listen(3001);
    this.socket = io(this.server);
    this.initializeMiddlewares();
    this.initializeApp();
  }
  public initializeApp() {
    // Template configuration
    this.app.set("view engine", "ejs");
    this.app.set("views", "public");

    // Static files configuration
    this.app.use("/assets", express.static(path.join(__dirname, "frontend")));

    // Controllers
    this.app.use('/api', new RoomController().router);
    this.app.use('/api', new AuthenticationController().router);
    this.app.use('/api', new UserController().router);
    this.app.get("/*", (req, res) => {
      res.render("index");
    });

    this.socket.on('connection', (client: SocketIO.Socket) => {
      console.log('a user connected');
      client.join('some room');

      client.on('game page open', () => {
        console.log('Game page open!! BE');
      });
      client.on('disconnect', () => {
        console.log('user disconnected');
      });
      client.on('chat msg', (msg: any) => {
        console.log('chat msg received');
        console.log(msg);
        client.broadcast.to('some room').emit('my message', msg);
      })
    });
  }
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }
}

// Start function
// export const start = (port: number): Promise<void> => {
//     const server = http.createServer(app);

//     return new Promise<void>((resolve, reject) => {
//         server.listen(port, resolve);
//     });
// };



export const start = (port: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    port = Number(process.env.PORT) || 5000;
    const server = new App().app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
  });
};

