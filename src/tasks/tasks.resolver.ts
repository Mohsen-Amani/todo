import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import {HttpException, InternalServerErrorException, NotFoundException, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/user.entity';
// DTOs
import { CreateTaskResponse } from './dtos/create-task.response';
import { CreateTaskInput } from './dtos/create-task.Input';
import { UpdateTaskResponse } from './dtos/update-task.response';
import { UpdateTaskInput } from './dtos/update-task.input';
import { DeleteTaskResponse } from './dtos/delete-task.response';
import { DeleteTaskInput } from './dtos/delete-task.input';
import { FetchSingleTaskInput } from './dtos/fetch-single-task.input';
import { CompleteTaskResponse } from './dtos/complete-task.response';
import { CompleteTaskInput } from './dtos/complete-task.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [Task], {
    name: 'tasks',
    description: 'Get task of all user tasks',
  })
  async fetchAll(@CurrentUser() user: User): Promise<Task[]> {
    const tasks = await this.tasksService.findAll({ user: { id: user.id } });
    console.log(tasks);
    return tasks;
  }

  @Query(() => Task, {
    name: 'task',
    description: 'Get a single task of all user tasks',
  })
  async fetchOne(
    @Args('input') input: FetchSingleTaskInput,
    @CurrentUser() user: User,
  ): Promise<Task> {
    const task = await this.tasksService.findOne({
      id: input.taskId,
      user: { id: user.id },
    });
    if (!task) {
      throw new NotFoundException('task does not exists.');
    }
    return task;
  }

  @Mutation(() => CreateTaskResponse, {
    name: 'createTask',
    description: 'Create new task',
  })
  async create(
    @Args('input') input: CreateTaskInput,
    @CurrentUser() user: User,
  ): Promise<CreateTaskResponse> {
    const task = await this.tasksService.create(
      input.description,
      input.listId,
      user,
    );
    if (!task) {
      throw new InternalServerErrorException('Operation Failed');
    }
    return new CreateTaskResponse('Task created successfully.', task);
  }

  @Mutation(() => UpdateTaskResponse, {
    name: 'updateTask',
    description: 'Update a task',
  })
  async update(
    @Args('input') input: UpdateTaskInput,
    @CurrentUser() user: User,
  ) {
    const { taskId, listId, ...inputData } = input;
    if (listId) {
      inputData['list'] = { id: listId };
    }
    const updateTask = await this.tasksService.update(
      { id: user.id },
      taskId,
      inputData,
    );
    if (!updateTask) {
      throw new InternalServerErrorException('Operation Failed');
    }
    return new UpdateTaskResponse('Task updated successfully.', updateTask);
  }

  @Mutation(() => DeleteTaskResponse, {
    name: 'deleteTask',
    description: 'Delete a task',
  })
  async delete(
    @Args('input') input: DeleteTaskInput,
    @CurrentUser() user: User,
  ) {
    const deleteTask = await this.tasksService.delete(input.taskId, {
      id: user.id,
    });
    if (!deleteTask) {
      throw new InternalServerErrorException('Operation Failed');
    }
    return new DeleteTaskResponse('Task deleted successfully.');
  }

  @Mutation(() => CompleteTaskResponse, {
    name: 'completeTask',
    description: 'Sets tasks as completed',
  })
  async completeTask(
    @Args('input') input: CompleteTaskInput,
    @CurrentUser() user: User,
  ) {
    const completeTask = await this.tasksService.complete(input.taskId, {
      id: user.id,
    });
    if (!completeTask) {
      throw new InternalServerErrorException('Operation Failed');
    }
    return new CompleteTaskResponse('Task completed successfully');
  }
}
