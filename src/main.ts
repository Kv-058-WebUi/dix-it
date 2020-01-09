import './preload_env';
import {SERVER_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, SERVER_URL} from "./config";
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
import { CardsCreatingMigration1577107758080 as CardsCreatingMigration } from "./migrations/1577107758080-CardsCreatingMigration";
import { RoomStatusesMigration1577366149533 as roomStatusMigration } from './migrations/1577369835936-roomStatusMigration';
import {Card} from "./web/backend/entities/Card";
import { AddCardsCreatingMigration1577368445530  as AddCardsCreatingMigration} from './migrations/1577368445530-AddCardsCreatingMigration';

async function main() {
    await web.start(SERVER_PORT);
    console.log(`Server started at ${SERVER_URL}:${SERVER_PORT}`);
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
    migrations: [UserIndeces, CardsCreatingMigration, roomStatusMigration, AddCardsCreatingMigration],
    cli: {
        migrationsDir: "migrations"
    },
    entities: [DixitUser, Card, Player, Room, RoomStatus, RelationshipStatus, Relationship, RoomPlayer]
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
