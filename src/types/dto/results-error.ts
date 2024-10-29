import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user';

@ObjectType()
export class ResultsAndErrors {
  @Field(() => [ErrorField], { nullable: 'itemsAndList' })
  errors: ErrorField[];

  @Field(() => [User], { nullable: false, defaultValue: [] })
  results: User[];
}

@ObjectType()
export class ErrorField {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  email: string;
}
