import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchAllGroupInput {
  @Field()
  name: string;
}
