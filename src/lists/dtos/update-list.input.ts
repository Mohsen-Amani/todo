import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class UpdateListInput {
  @IsNumber()
  @IsNotEmpty()
  @Field({
    nullable: true,
  })
  listId: number;

  @IsString()
  @IsNotEmpty()
  @Field({
    nullable: true,
  })
  name: string;

  @IsString()
  @Field({
    nullable: true,
  })
  description: string;
}
