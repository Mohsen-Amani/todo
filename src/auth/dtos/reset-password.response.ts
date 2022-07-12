import { UserResponse } from '../../interfaces/user-response.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { Any } from 'typeorm';

@ObjectType()
export class ResetPasswordResponse implements UserResponse {
  @Field()
  message: string;

  @Field(() => Any)
  data: any;

  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}
