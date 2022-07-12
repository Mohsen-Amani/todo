import { UserResponse } from '../../interfaces/user-response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { List } from '../list.entitiy';

@ObjectType()
export class UpdateListResponse implements UserResponse {
  @Field()
  message: string;

  @Field(() => List)
  data: List;

  constructor(message: string, data: List) {
    this.message = message;
    this.data = data;
  }
}
