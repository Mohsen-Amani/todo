import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { usersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, AuthModule, UsersModule],
  controllers: [
    AppController,
    TasksController,
    TasksController,
    usersController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
