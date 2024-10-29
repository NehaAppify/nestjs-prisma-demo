import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FAQ {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  question!: string;

  @Field(() => String, { nullable: false })
  answer!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
