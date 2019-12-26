import {MigrationInterface, QueryRunner, getConnection} from "typeorm";
import { RoomStatus } from "../web/backend/entities/RoomStatus";

const statuses = [
    {
        code: 1,
        status: 'in progress'
    },
    {
        code: 2,
        status: 'waiting for players'
    },
    {
        code: 3,
        status: 'finished'
    },
];

export class RoomStatusesMigration1577366149533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        for(let i = 0; i < statuses.length; i++) {
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(RoomStatus)
            .values(statuses[i])
            .execute();
        }
      }

    public async down(queryRunner: QueryRunner): Promise<any> {
        for(let i = 0; i < statuses.length; i++) {
            await getConnection()
            .createQueryBuilder()
            .delete()
            .from(RoomStatus)
            .where("code = :code", { code: statuses[i].code})
            .execute();
        }
    }

}