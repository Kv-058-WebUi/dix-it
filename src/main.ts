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
import {UserIndices1576322993380 as UserIndeces} from './migrations/1576322993380-UserIndices';
import {Card} from "./web/backend/entities/Card";

async function main() {
    await web.start(SERVER_PORT);
    console.log(`Server started at http://localhost:${SERVER_PORT}`);
    console.log(`${process.env.PORT}`);
}

const options: ConnectionOptions = {
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    entities: [DixitUser, Card, Player, Room, RoomStatus, RelationshipStatus, Relationship, RoomPlayer]
};

createConnection(options).then(async connection => {
    // const card = new Card();
    // card.card_path = 'card_18.png';
    // await connection.manager.save(card);

    // const user = new DixitUser();
    // user.email = 'test@gmail.com';

    // card.card_path = 'test@gmail.com';
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
