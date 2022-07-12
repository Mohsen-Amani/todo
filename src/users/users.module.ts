import { Module } from '@nestjs/common';
// Modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from '../groups/groups.module';
import { ListsModule } from '../lists/lists.module';
// Services
import { UsersService } from './users.service';
// Resolvers
import { UsersResolver } from './users.resolver';

import { User } from './user.entity';

@Module({
  imports: [ListsModule, GroupsModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
