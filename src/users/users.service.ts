import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { ListsService } from '../lists/lists.service';
import { CreateUserInput } from './dtos/create-user.input';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private listsService: ListsService,
    private groupsService: GroupsService,
  ) {}

  async findAll(filter: FindOptionsWhere<User> = {}): Promise<User[]> {
    return await this.repo.findBy(filter);
  }

  findById(id: number): Promise<User | undefined> {
    return this.repo
      .createQueryBuilder()
      .leftJoin('password_resets', 'password_resets.user_id')
      .where('user.id = :id', { id })
      .getOne();
  }

  findOne(filter: FindOptionsWhere<User> = {}): Promise<User | null> {
    return this.repo.findOne({ relations: ['password_resets'], where: filter });
  }

  exists(filter: FindOptionsWhere<User>): Promise<number> {
    return this.repo.countBy(filter);
  }

  async create(userData: CreateUserInput): Promise<User> {
    const user = this.repo.create(userData);
    await this.listsService.createDefaultLists(user);
    // create group
    const group = await this.groupsService.create('My Group');
    if (!group) {
      throw new InternalServerErrorException('Operation Failed.');
    }
    user.groups = [group];

    return await user.save();
  }

  update(
    user: User | number,
    properties: Partial<User>,
  ): Promise<UpdateResult> {
    if (user instanceof User) {
      user = user.id;
    }
    return this.repo.update(user, properties);
  }
}
