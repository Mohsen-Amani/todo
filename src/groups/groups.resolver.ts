import { Args, Query, Resolver } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Group } from './group.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.guard';
// DTOs
import { FetchAllGroupInput } from './dtos/fetchall-group.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class GroupsResolver {
  constructor(private groupsService: GroupsService) {}

  @Query(() => [Group], {
    name: 'groups',
    description: 'Get list of all user groups',
  })
  fetchAll(
    @Args('filter') filter: FetchAllGroupInput,
    @CurrentUser() user: User,
  ): Promise<Group[]> {
    return this.groupsService.findAll(user, filter);
  }
}
