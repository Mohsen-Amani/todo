import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class FetchSingleListInput {
  @IsNumber()
  @IsNotEmpty()
  @Field()
  listId: number;
}
