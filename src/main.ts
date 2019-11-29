import {SERVER_PORT} from "./config";
import "reflect-metadata";
import * as web from "./web";
import {ConnectionOptions, createConnection} from "typeorm";
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

main().catch(error => console.error(error));

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

    let user = new DixitUser();
    user.nickname = "Ricardo Milos";
    user.email = "hello";
    user.password = "password";
    user.profile_picture = 'path';
    user.lastonline = new Date();
    user.created_at = new Date();

    let user1 = new DixitUser();
    user1.nickname = "Ricardo Milos";
    user1.email = "hello";
    user1.password = "password";
    user1.profile_picture = 'path';
    user1.lastonline = new Date();
    user1.created_at = new Date();

    // let player = new Player();
    // player.user_id = user;
    // player.nickname = user;

    let relationshipStatusPending = new RelationshipStatus();
    relationshipStatusPending.status = 'pending';

    let relationshipStatusFriends = new RelationshipStatus();
    relationshipStatusFriends.code = 1;
    relationshipStatusFriends.status = 'friends';


    let relationship = new Relationship();
    relationship.user1_id = user;
    relationship.user2_id = user1;
    relationship.status = relationshipStatusFriends;

    await connection.manager.save(user);
    await connection.manager.save(user1);
    await connection.manager.save(relationshipStatusFriends);
    await connection.manager.save(relationship); //save object to DB

    // let roomStatus = new RoomStatus();
    // roomStatus.code = 1;
    // roomStatus.status = 'in progress';

    // let room = new Room();
    // room.creator_id = player;
    // room.is_private = true;
    // room.max_players = 7;
    // room.name = 'room';
    // room.password = '12345';
    // room.status = roomStatus;
    // room.timestamp = new Date();
    // room.room_code = 'x5jc';

    // let userRepository = connection.getRepository(DixitUser);
    // let roomRepository = connection.getRepository(Player);
    // let roomStatusRepository = connection.getRepository(RoomStatus);
    // let playerRepository = connection.getRepository(Room);

    // userRepository.save(user)
    // .then(user => console.log("user has been saved: ", user))
    // .catch(error => console.log("Cannot save. Error: ", error));

    // roomStatusRepository.save(roomStatus)
    // .then(roomStatus => console.log("roomStatus has been saved: ", roomStatus))
    // .catch(error => console.log("Cannot save. Error: ", error));

}, error => console.log("Cannot connect: ", error));
