import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { ListsModule } from '../lists/lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ListsModule],
  providers: [TasksService, TasksResolver],
})
export class TasksModule {}
