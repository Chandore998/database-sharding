import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

@Entity('users')
@Index('idx_tenant_email', ['tenant_id', 'email'])
@Index('idx_tenant_username', ['tenant_id', 'username'])
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true , type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 100})
  tenant_id: string;

  @Column({ unique: true , type: 'varchar', length: 200})
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true , type: 'varchar', length: 100 })
  first_name: string;

  @Column({ nullable: true , type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'timestamp' , default: new Date() })
  login_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

