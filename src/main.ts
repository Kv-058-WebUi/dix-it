import {SERVER_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME} from "./config";
import "reflect-metadata";
import * as web from "./web";
import {ConnectionOptions, createConnection, getRepository} from "typeorm";
import {DixitUser} from './web/backend/entities/User';
import {Player} from './web/backend/entities/Player';
import { RoomStatus } from "./web/backend/entities/RoomStatus";
import { Room } from "./web/backend/entities/Room";
import { RelationshipStatus } from "./web/backend/entities/RelationshipStatus";
import { Relationship } from "./web/backend/entities/Relationship";
import { RoomPlayer } from "./web/backend/entities/RoomPlayers";


async function main() {
    await web.start(SERVER_PORT);
    console.log(`Server started at http://localhost:${SERVER_PORT}`);
    console.log(`${process.env.PORT}`);
}

const options: ConnectionOptions = {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "dixit",
    password: "dixit",
    database: "dixit",
    synchronize: true,
    entities: [DixitUser, Player, Room, RoomStatus, RelationshipStatus, Relationship, RoomPlayer]
};

createConnection(options).then(async connection => {
    // const card = new Card();
    // card.card_path = 'card_1.png';

    // const user = new DixitUser();
    // user.email = 'test@gmail.com';
    // user.nickname = 'vanya';
    // user.password = '123sad';
    //
    // const player = new Player();
    // player.user_id = user;
    // player.nickname = 'dunkey';
    // await connection.manager.save(user);
    // await connection.manager.save(player);

}, error => console.log("Cannot connect: ", error)).then(() => {
    return main();
}).catch(error => console.error(error));
