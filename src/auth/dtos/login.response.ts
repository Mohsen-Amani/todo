import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/user.entity';
import { UserResponse } from '../../interfaces/user-response.interface';

@ObjectType()
class LoginData {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class LoginResponse implements UserResponse {
  @Field()
  message: string;

  @Field(() => LoginData)
  data: LoginData;

  constructor(message: string, data: LoginData) {
    this.message = message;
    this.data = data;
  }
}
