import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class DeleteTaskInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  taskId: number;
}
