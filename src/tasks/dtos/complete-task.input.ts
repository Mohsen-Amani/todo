import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CompleteTaskInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  taskId: number;
}
