import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User, UserStatus } from '../../shard-entities/user.entity';
import { ShardRouterService } from '../shard/shard-router.service';
import { LoginDto, SignupDto } from '../../common/dto/user.dto';
import { TenantService } from '../shard/tenant.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly tenantService : TenantService
) {}

  private async getRepository(tenantId: string): Promise<Repository<User>> {
    const dataSource = await this.tenantService.getShardDataSource(tenantId);
    return dataSource.getRepository(User);
  }

  async create(tenantId: string, createUserDto: Partial<User>): Promise<User> {
    const repository = await this.getRepository(tenantId);
    
    // Check if email already exists
    const existingUserByEmail = await repository.findOne({
      where: { email: createUserDto.email, tenant_id: tenantId },
    });
    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    // Check if username already exists
    const existingUserByUsername = await repository.findOne({
      where: { username: createUserDto.username, tenant_id: tenantId },
    });
    if (existingUserByUsername) {
      throw new ConflictException('User with this username already exists');
    }

    const user = repository.create({
      ...createUserDto,
      tenant_id: tenantId,
      status: createUserDto.status || UserStatus.ACTIVE,
    });

    return await repository.save(user);
  }

  async findOne(tenantId: string, id: string): Promise<User> {
    const repository = await this.getRepository(tenantId);
    const user = await repository.findOne({
      where: { id, tenant_id: tenantId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(tenantId: string, email: string): Promise<User | null> {
    const repository = await this.getRepository(tenantId);
    return repository.findOne({
      where: { email, tenant_id: tenantId },
    });
  }

  async login(loginDto: LoginDto): Promise<User> {
    const tenantId = await this.tenantService.fetchByIdentifier(loginDto.email);
    if (!tenantId) {
      throw new ConflictException('Invalid email domain');
    }

    const repository = await this.getRepository(tenantId);
    const user = await repository.findOne({
      where: { email: loginDto.email, tenant_id: tenantId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  } 

  async signup(signupDto: SignupDto): Promise<{ message: string; user: User }> {
    
    const tenant = await this.tenantService.createFromEmail(signupDto.email);
    
    if (!tenant?.id) {
      throw new ConflictException('Failed to create or retrieve tenant');
    }

    // Create user in the appropriate shard
    const user = await this.create(tenant.id, signupDto);

    return {
      message: 'Signup successful',
      user,
    };
  }

}

