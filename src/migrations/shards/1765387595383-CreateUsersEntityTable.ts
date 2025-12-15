import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersEntityTable1765387595383 implements MigrationInterface {
    name = 'CreateUsersEntityTable1765387595383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive', 'pending', 'blocked')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "tenant_id" character varying(100) NOT NULL, "username" character varying(200) NOT NULL, "password" character varying NOT NULL, "first_name" character varying(100), "last_name" character varying(100), "status" "public"."users_status_enum" NOT NULL DEFAULT 'active', "login_time" TIMESTAMP NOT NULL DEFAULT '"2025-12-10T17:26:36.388Z"', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_109638590074998bb72a2f2cf08" UNIQUE ("tenant_id"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_tenant_username" ON "users" ("tenant_id", "username") `);
        await queryRunner.query(`CREATE INDEX "idx_tenant_email" ON "users" ("tenant_id", "email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_username"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    }

}
