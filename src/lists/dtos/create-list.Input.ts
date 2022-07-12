import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateListInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @Field({
    nullable: true,
  })
  description: string;
}
