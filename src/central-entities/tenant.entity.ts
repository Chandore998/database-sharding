import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TenantStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
    BLOCKED = 'blocked',
}

@Entity('tenants')
@Index('idx_identifier', ['identifier'])
@Index('idx_shard_index', ['shard_index'])
export class Tenant {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;
    
    @Column({ type: 'varchar', length: 100 })
    identifier: string;

    @Column({ type: 'integer' })
    shard_index: number;

    @Column({ type: 'enum', enum: TenantStatus, default: TenantStatus.ACTIVE })
    status: TenantStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}