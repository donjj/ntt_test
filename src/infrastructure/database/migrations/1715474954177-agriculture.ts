import { MigrationInterface, QueryRunner } from 'typeorm';

export class Agriculture1715474954177 implements MigrationInterface {
  name = 'Agriculture1715474954177';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "cpf_or_cnpj" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "farm_name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "total_area" integer NOT NULL, "vegetation_area" integer NOT NULL, "arable_area" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
