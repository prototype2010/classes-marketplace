import { MigrationInterface, QueryRunner } from 'typeorm';

export class FacebookId1604409057908 implements MigrationInterface {
  name = 'FacebookId1604409057908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "facebookId" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookId"`);
  }
}
