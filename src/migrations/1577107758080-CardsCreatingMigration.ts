import {MigrationInterface, QueryRunner, getRepository, getConnection} from "typeorm";
import { Card } from '../web/backend/entities/Card';

const cards = [
    {
        card_path: 'card_1.png'
    },
    {
        card_path: 'card_2.png'
    },
    {
        card_path: 'card_3.png'
    },
    {
        card_path: 'card_4.png'
    },
    {
        card_path: 'card_5.png'
    },
    {
        card_path: 'card_6.png'
    },
    {
        card_path: 'card_7.png'
    },
    {
        card_path: 'card_8.png'
    },
    {
        card_path: 'card_9.png'
    },
    {
        card_path: 'card_10.png'
    },
    {
        card_path: 'card_11.png'
    },
    {
        card_path: 'card_12.png'
    },
    {
        card_path: 'card_13.png'
    },
    {
        card_path: 'card_14.png'
    },
    {
        card_path: 'card_15.png'
    },
    {
        card_path: 'card_16.png'
    },
    {
        card_path: 'card_17.png'
    },
    {
        card_path: 'card_18.png'
    }
];

export class CardsCreatingMigration1577107758080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        for(let i = 0; i < cards.length; i++) {
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Card)
            .values(cards[i])
            .execute();
        }
      }

    public async down(queryRunner: QueryRunner): Promise<any> {
        for(let i = 0; i < cards.length; i++) {
            await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Card)
            .where("card_path = :path", { path: cards[i].card_path})
            .execute();
        }
    }

}
//typeorm migration:create -n CardsCreatingMigration