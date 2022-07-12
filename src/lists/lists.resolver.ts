import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ListsService } from './lists.service';
import { List } from './list.entitiy';
import { InternalServerErrorException, NotFoundException, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/user.entity';
// DTOs
import { CreateListInput } from './dtos/create-list.Input';
import { CreateListResponse } from './dtos/create-list.response';
import { DeleteListResponse } from './dtos/delete-list.response';
import { DeleteListInput } from './dtos/delete-list.input';
import { UpdateListInput } from './dtos/update-list.input';
import { UpdateListResponse } from './dtos/update-list.response';
import { FetchSingleListInput } from './dtos/fetch-single-list.Input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ListsResolver {
  constructor(private listsService: ListsService) {}

  @Query(() => [List], {
    name: 'lists',
    description: 'Get list of all user list of tasks',
  })
  fetchAll(@CurrentUser() user: User): Promise<List[]> {
    return this.listsService.findAll({ user: { id: user.id } });
  }

  @Query(() => List, {
    name: 'list',
    description: 'Get a single list of all user list of tasks',
  })
  async fetchOne(
    @Args('input') input: FetchSingleListInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    const list = await this.listsService.findOne({
      id: input.listId,
      user: { id: user.id },
    });
    if (!list) {
      throw new NotFoundException('list does not exists.');
    }
    return list;
  }

  @Mutation(() => CreateListResponse, {
    name: 'createList',
    description: 'Create new list',
  })
  async create(
    @Args('input') input: CreateListInput,
    @CurrentUser() user: User,
  ): Promise<CreateListResponse> {
    const list = await this.listsService.create(
      input.name,
      input.description,
      user,
    );
    if (!list) {
      throw new InternalServerErrorException('Operation Failed');
    }
    return new CreateListResponse('List created successfully.', list);
  }

  @Mutation(() => UpdateListResponse, {
    name: 'updateList',
    description: 'Update a list',
  })
  async update(
    @Args('input') input: UpdateListInput,
    @CurrentUser() user: User,
  ) {
    const { listId, ...inputData } = input;
    const updateList = await this.listsService.update(
      { id: user.id },
      listId,
      inputData,
    );
    if (!updateList) {
      throw new InternalServerErrorException('Operation Failed');
    }
    return new UpdateListResponse('List updated successfully.', updateList);
  }

  @Mutation(() => DeleteListResponse, {
    name: 'deleteList',
    description: 'Delete a list',
  })
  async delete(
    @Args('input') input: DeleteListInput,
    @CurrentUser() user: User,
  ) {
    const deleteList = await this.listsService.delete(input.listId, {
      id: user.id,
    });
    if (!deleteList) {
      throw new InternalServerErrorException('Operation Failed');
    }
    return new DeleteListResponse('List deleted successfully.');
  }
}
