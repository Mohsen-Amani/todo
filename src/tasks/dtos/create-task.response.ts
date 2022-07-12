import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponse } from '../../interfaces/user-response.interface';
import { Task } from '../task.entity';

@ObjectType()
export class CreateTaskResponse implements UserResponse {
  @Field()
  message: string;

  @Field(() => Task)
  data: Task;

  constructor(message: string, data: Task) {
    this.message = message;
    this.data = data;
  }
}
