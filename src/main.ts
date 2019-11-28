import {SERVER_PORT} from "./config";
import "reflect-metadata";
import * as web from "./web";
import {ConnectionOptions, createConnection} from "typeorm";
import {User} from './web/backend/entities/User';
import {Player} from './web/backend/entities/Player';
import { prototype } from "events";

async function main() {
    await web.start(SERVER_PORT);
    console.log(`Server started at http://localhost:${SERVER_PORT}`);
    console.log(`${process.env.PORT}`);
}

main().catch(error => console.error(error));

const options: ConnectionOptions = {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "dixit",
    password: "dixit",
    database: "dixit",
    synchronize: true,
    entities: [User, Player]
};

createConnection(options).then(async connection => {

    let user = new User();
    user.nickname = "new player";
    user.email = "hello";
    user.password = "password";
    user.profile_picture = 'path';
    user.lastonline = new Date();
    user.created_at = new Date();

    await connection.manager.save(user);

    let player = new Player();
    player.user_id = user;
    player.nickname = user.nickname;


    let userRepository = connection.getRepository(User);
    let playerRepository = connection.getRepository(Player);

    playerRepository.save(player)
    .then(player => console.log("player has been saved: ", player))
    .catch(error => console.log("Cannot save player. Error: ", error));

    userRepository
        .save(user)
        .then(user => console.log("user has been saved: ", user))
        .catch(error => console.log("Cannot save. Error: ", error));

}, error => console.log("Cannot connect: ", error));
