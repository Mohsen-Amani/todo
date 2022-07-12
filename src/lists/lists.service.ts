import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entitiy';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ListsService {
  constructor(@InjectRepository(List) private repo: Repository<List>) {}

  async createDefaultLists(user: User): Promise<List[]> {
    return this.repo.save([
      { name: 'My Day', user },
      { name: 'Important', user },
      { name: 'Planned', user },
      { name: 'Assigned to me', user },
    ]);
  }

  async findAll(filter?: FindOptionsWhere<List>): Promise<List[]> {
    return await this.repo.findBy(filter);
  }

  async findOne(filter: FindOptionsWhere<List> = {}): Promise<List> {
    return await this.repo.findOne({
      relations: ['tasks'],
      where: filter,
    });
  }

  async create(name: string, description: string, user: User): Promise<List> {
    const list = await this.findOne({ name });
    if (list) {
      throw new ConflictException('List already exists.');
    }
    return this.repo.save({
      name,
      description,
      user,
    });
  }

  async update(
    user: FindOptionsWhere<User>,
    listId: number,
    data: Partial<List>,
  ): Promise<List> {
    const list = await this.findOne({ id: listId, user });
    if (!list) {
      throw new NotFoundException('List does not exists');
    }
    // Insecure do to overriding entity id
    return this.repo.save({
      id: listId,
      ...data,
    });
    // Recommended
    // Note: using query builder for update
    // returns updateResult make sure fix resolver response type
    // return (
    //   this.repo
    //     .createQueryBuilder()
    //     .update({
    //       name,
    //       description,
    //     })
    //     .where({
    //       id: listId,
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
}
