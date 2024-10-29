import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateFAQInput {
  @Field()
  question: string;

  @Field()
  answer: string;
}

@InputType()
export class UpdateFAQInput extends PartialType(CreateFAQInput) {
  @Field(() => Int)
  id: number;
}
