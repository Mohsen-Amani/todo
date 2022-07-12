import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Group } from '../../groups/group.entity';

export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
