import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Match } from '../../decorators/match.decorator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @MaxLength(45)
  @IsString()
  @IsNotEmpty()
  @Field()
  full_name: string;

  @MaxLength(45)
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is not strong enough',
  })
  @MaxLength(45)
  @MinLength(6)
  @IsNotEmpty()
  @Field()
  password: string;

  @Match('password')
  @IsNotEmpty()
  @Field()
  confirm_password: string;
}
