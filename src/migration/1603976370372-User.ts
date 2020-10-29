import {MigrationInterface, QueryRunner} from "typeorm";

export class User1603976370372 implements MigrationInterface {
    name = 'User1603976370372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "role" character varying NOT NULL DEFAULT 'parent', "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isApprovedByAdmin" boolean NOT NULL DEFAULT false, "isEmailConfirmed" boolean NOT NULL DEFAULT false, "emailConfirmationHash" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
