import express from "express";
import path from "path";
import RoomController from "./backend/controllers/room.controller";
import AuthenticationController from "./backend/authentication/authentication.controller";
import bodyParser from "body-parser";
import { UserController } from "./backend/controllers/user.controller";
import { DemoController } from "./backend/controllers/demo.controller";
import { CardDeckController } from "./backend/controllers/cardDeck.controller";
import { ReviewCardsController } from "./backend/controllers/rewiewCard.controller";
import UploadCardController from "./backend/controllers/uploadCard.controller";

import cors from "cors";
import io from "socket.io"
import SocketIO from "socket.io";
import SocketController from "./backend/controllers/socket.controller";
import passport from './backend/authentication/passport/passport';

class App {
  public app: express.Application;
  public socket!: SocketIO.Server;
  // Express app initialization
  constructor() {
    this.app = express();
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
    this.app.use('/api', new DemoController().router);
    this.app.use('/api', new CardDeckController().router);
    this.app.use('/api', new ReviewCardsController().router);
    this.app.use('/api', new UploadCardController().router);
    this.app.get("/*", (req, res) => {
      res.render("index");
    });
  }

  public initializeSocket() {
    new SocketController().initializeSocket(this.socket);
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(passport.initialize());
  }
}

export const start = (port: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const app = new App();
    const server = app.app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
    app.socket = io(server);
    app.initializeSocket();
  });
};

