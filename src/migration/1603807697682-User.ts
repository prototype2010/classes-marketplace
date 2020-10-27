import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1603807697682 implements MigrationInterface {
  name = 'User1603807697682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "email" character varying NOT NULL, "contactEmail" character varying, "phone" character varying NOT NULL, "password" character varying NOT NULL, "localBusinessId" character varying, "name" character varying, "owner" character varying, "website" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
