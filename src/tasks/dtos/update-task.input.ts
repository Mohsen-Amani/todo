import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @IsNumber()
  @IsNotEmpty()
  @Field()
  taskId: number;

  @IsString()
  @Field({
    nullable: true,
  })
  description: string;

  @IsNumber()
  @Field({
    nullable: true,
  })
  listId: number;
}
