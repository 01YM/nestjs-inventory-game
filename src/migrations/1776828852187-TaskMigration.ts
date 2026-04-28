import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskMigration1776828852187 implements MigrationInterface {
    name = 'TaskMigration1776828852187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "description" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
    }

}
