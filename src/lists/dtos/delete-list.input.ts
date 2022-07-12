import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class DeleteListInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  listId: number;
}
