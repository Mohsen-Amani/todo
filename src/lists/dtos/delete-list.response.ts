import { UserResponse } from '../../interfaces/user-response.interface';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteListResponse implements UserResponse {
  @Field()
  message: string;

  constructor(message) {
    this.message = message;
  }
}
