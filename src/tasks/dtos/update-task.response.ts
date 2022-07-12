import { UserResponse } from '../../interfaces/user-response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../task.entity';

@ObjectType()
export class UpdateTaskResponse implements UserResponse {
  @Field()
  message: string;

  @Field(() => Task)
  data: Task;

  constructor(message: string, data: Task) {
    this.message = message;
    this.data = data;
  }
}
