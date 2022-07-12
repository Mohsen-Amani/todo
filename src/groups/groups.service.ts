import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {User} from "../users/user.entity";

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private repo: Repository<Group>) {}

  async create(name: string, description?: string) {
    return this.repo.save({ name, description });
  }

  async findAll(
    user: User,
    filter?: FindOptionsWhere<Group>,
  ): Promise<Group[]> {
    console.log('filter', filter);
    return await this.repo
      .createQueryBuilder('groups')
      .innerJoinAndSelect('groups.users', 'user')
      .where('user_id = :userId ', { userId: user.id })
      .getMany();
  }
}
