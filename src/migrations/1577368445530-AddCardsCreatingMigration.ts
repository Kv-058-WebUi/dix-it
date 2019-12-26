import {MigrationInterface, QueryRunner, getRepository, getConnection} from "typeorm";
import { Card } from '../web/backend/entities/Card';

const cards = [
    {
        card_path: 'card_19.png'
    },
    {
        card_path: 'card_20.png'
    },
    {
        card_path: 'card_21.png'
    },
    {
        card_path: 'card_22.png'
    },
    {
        card_path: 'card_23.png'
    },
    {
        card_path: 'card_24.png'
    },
    {
        card_path: 'card_25.png'
    },
    {
        card_path: 'card_26.png'
    },
    {
        card_path: 'card_27.png'
    },
    {
        card_path: 'card_28.png'
    },
    {
        card_path: 'card_29.png'
    },
    {
        card_path: 'card_30.png'
    },
    {
        card_path: 'card_31.png'
    },
    {
        card_path: 'card_32.png'
    },
    {
        card_path: 'card_33.png'
    },
    {
        card_path: 'card_34.png'
    },
    {
        card_path: 'card_35.png'
    },
    {
        card_path: 'card_36.png'
    },
    {
        card_path: 'card_37.png'
    },
    {
        card_path: 'card_38.png'
    },
    {
        card_path: 'card_39.png'
    },
    {
        card_path: 'card_40.png'
    },
    {
        card_path: 'card_41.png'
    },
    {
        card_path: 'card_42.png'
    },
    {
        card_path: 'card_43.png'
    },
    {
        card_path: 'card_44.png'
    },
    {
        card_path: 'card_45.png'
    },
    {
        card_path: 'card_46.png'
    },
    {
        card_path: 'card_47.png'
    },
    {
        card_path: 'card_48.png'
    },
    {
        card_path: 'card_49.png'
    },
    {
        card_path: 'card_50.png'
    },
    {
        card_path: 'card_51.png'
    },
    {
        card_path: 'card_52.png'
    },
    {
        card_path: 'card_53.png'
    },
    {
        card_path: 'card_54.png'
    },
    {
        card_path: 'card_55.png'
    },
    {
        card_path: 'card_56.png'
    },
    {
        card_path: 'card_57.png'
    },
    {
        card_path: 'card_58.png'
    }
];

export class AddCardsCreatingMigration1577368445530 implements MigrationInterface {

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
//node node_modules/typeorm/cli migration:create -n AddCardsCreatingMigration;
