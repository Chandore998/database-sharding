import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ShardModule } from '../shard/shard.module';

@Module({
  imports: [ShardModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

