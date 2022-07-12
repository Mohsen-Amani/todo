import { UserResponse } from '../../interfaces/user-response.interface';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompleteTaskResponse implements UserResponse {
  @Field()
  message: string;

  constructor(message) {
    this.message = message;
  }
}
