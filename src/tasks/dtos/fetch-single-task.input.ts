import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class FetchSingleTaskInput {
  @IsNumber()
  @IsNotEmpty()
  @Field()
  taskId: number;
}
