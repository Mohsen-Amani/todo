import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;
}
