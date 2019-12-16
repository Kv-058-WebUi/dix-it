import {MigrationInterface, QueryRunner} from "typeorm";

export class UserIndices1576322993380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        console.log('running user indeces');
        await queryRunner.query('CREATE UNIQUE INDEX USER_NICKNAME_INDEX ON dixit_user (LOWER(nickname));');
        await queryRunner.query('CREATE UNIQUE INDEX USER_EMAIL_INDEX ON dixit_user (LOWER(email));');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP INDEX USER_NICKNAME_INDEX;');
        await queryRunner.query('DROP INDEX USER_EMAIL_INDEX;');
    }

}
