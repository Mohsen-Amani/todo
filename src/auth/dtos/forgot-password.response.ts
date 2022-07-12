import { ObjectType, Field } from '@nestjs/graphql';
import { UserResponse } from '../../interfaces/user-response.interface';

@ObjectType()
export class ForgotPasswordResponse implements UserResponse {
  @Field()
  message: string;

  constructor(message) {
    this.message = message;
  }
}
