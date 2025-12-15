import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntityTable1765718339497 implements MigrationInterface {
    name = 'UpdateUserEntityTable1765718339497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_username"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_109638590074998bb72a2f2cf08"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "login_time" SET DEFAULT '"2025-12-14T13:19:00.080Z"'`);
        await queryRunner.query(`CREATE INDEX "idx_tenant_username" ON "users" ("tenant_id", "username") `);
        await queryRunner.query(`CREATE INDEX "idx_tenant_email" ON "users" ("tenant_id", "email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_username"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "login_time" SET DEFAULT '2025-12-10 17:26:36.388'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_109638590074998bb72a2f2cf08" UNIQUE ("tenant_id")`);
        await queryRunner.query(`CREATE INDEX "idx_tenant_email" ON "users" ("email", "tenant_id") `);
        await queryRunner.query(`CREATE INDEX "idx_tenant_username" ON "users" ("tenant_id", "username") `);
    }

}
