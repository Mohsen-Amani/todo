import { Module } from '@nestjs/common';
// Modules
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { GroupsModule } from './groups/groups.module';
import { ListsModule } from './lists/lists.module';
// Resolvers
import { AppResolver } from './app.resolver';
// Services
import { AppService } from './app.service';
// Entities
import { User } from './users/user.entity';
import { PasswordReset } from './auth/password-reset.entity';
import { Group } from './groups/group.entity';
import { List } from './lists/list.entitiy';
import { Task } from './tasks/task.entity';
// Utilities
import { join } from 'path';
// **
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {TasksModule} from "./tasks/tasks.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        return {
          type: config.get<'sqlite' | 'mariadb' | 'postgres'>('DB_DRIVER'),
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, PasswordReset, Group, List, Task],
        };
      },
    }),
    AppModule,
    UsersModule,
    AuthModule,
    MailModule,
    ListsModule,
    TasksModule,
    GroupsModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
