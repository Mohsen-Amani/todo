import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
