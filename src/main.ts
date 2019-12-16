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
    migrationsRun: true,
    migrations: [UserIndeces],
    cli: {
        migrationsDir: "migrations"
    },
    entities: [DixitUser, Player, Room, RoomStatus, RelationshipStatus, Relationship, RoomPlayer]
};

createConnection(options)
    .then(connection => {
        console.log("Connected to db");
        connection.runMigrations();
        console.log("Migrations complete");
    }, error => {
        console.log("Cannot connect: ", error)
    })
    .then(main)
    .catch(error => {console.error(error)});
