import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponse } from '../../interfaces/user-response.interface';
import { List } from '../list.entitiy';

@ObjectType()
export class CreateListResponse implements UserResponse {
  @Field()
  message: string;

  @Field(() => List)
  data: List;

  constructor(message: string, data: List) {
    this.message = message;
    this.data = data;
  }
}
