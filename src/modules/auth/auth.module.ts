import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ShardModule } from '../shard/shard.module';

@Module({
    imports: [UsersModule,ShardModule],
    controllers: [AuthController],
    providers: [UsersService],
    exports: [],
})
export class AuthModule { }

