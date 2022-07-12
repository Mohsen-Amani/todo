import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { ListsService } from '../lists/lists.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private repo: Repository<Task>,
    private listsService: ListsService,
  ) {}

  async findAll(filter: FindOptionsWhere<Task> = {}): Promise<Task[]> {
    return await this.repo.findBy(filter);
  }

  async findOne(filter: FindOptionsWhere<Task> = {}): Promise<Task> {
    return await this.repo.findOne({ relations: ['list'], where: filter });
  }

  async create(description: string, listId: number, user: User): Promise<Task> {
    const list = await this.listsService.findOne({
      id: listId,
      user: { id: user.id },
    });
    if (!list) {
      throw new NotFoundException('List does not exists.');
    }
    return this.repo.save({
      list,
      description,
      user,
    });
  }

  async update(
    user: FindOptionsWhere<User>,
    taskId: number,
    data: Partial<Task>,
  ): Promise<Task> {
    const task = await this.findOne({ id: taskId, user });
    if (!task) {
      throw new NotFoundException('Task does not exists');
    }
    // Insecure do to overriding entity id
    return this.repo.save({
      id: taskId,
      ...data,
    });
    // Recommended
    // Note: using query builder for update
    // returns updateResult make sure fix resolver response type
    // return (
    //   this.repo
    //     .createQueryBuilder()
    //     .update({
    //       description,
    //     })
    //     .where({
    //       id: taskId,
    //     })
    //     // .returning('name') // returning is not supported by sqlite
    //     .execute()
    // );
  }

  async delete(
    id: number,
    user: FindOptionsWhere<User>,
  ): Promise<DeleteResult> {
    return this.repo.delete({ id, user });
  }

  async complete(id: number, user: FindOptionsWhere<User>) {
    return this.repo
      .createQueryBuilder()
      .update({
        completed_at: new Date(),
      })
      .where({
        id,
        user,
      })
      .execute();
  }
}
