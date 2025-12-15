import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTenantEntityTable1765387120261 implements MigrationInterface {
    name = 'CreateTenantEntityTable1765387120261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "identifier" character varying(100) NOT NULL, "shard_index" integer NOT NULL, "status" "public"."tenants_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_shard_index" ON "tenants" ("shard_index") `);
        await queryRunner.query(`CREATE INDEX "idx_identifier" ON "tenants" ("identifier") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_identifier"`);
        await queryRunner.query(`DROP INDEX "public"."idx_shard_index"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
    }

}
