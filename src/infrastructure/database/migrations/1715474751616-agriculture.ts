import { MigrationInterface, QueryRunner } from 'typeorm';

export class Agriculture1715474751616 implements MigrationInterface {
  name = 'Agriculture1715474751616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "plantedcrops" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_47ab9775113f79b1c6ff444b7f9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "plantedcrops"`);
  }
}
