import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1739020351427 implements MigrationInterface {
    name = 'Auto1739020351427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ai_model" ("id" SERIAL NOT NULL, "model_name" character varying NOT NULL, "price_per_answer" integer NOT NULL, CONSTRAINT "PK_9f926c968fb122f3e89424faaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "user_password" character varying NOT NULL, "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "ai_model"`);
    }

}
