import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  Matches,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../decorators/match.decorator';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsNotEmpty()
  token: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is not strong enough',
  })
  @MaxLength(25)
  @MinLength(6)
  @IsString()
  @Field()
  password: string;

  @Match('password')
  @Field()
  confirm_password: string;
}
