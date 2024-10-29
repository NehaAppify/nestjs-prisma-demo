import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false, defaultValue: '' })
  firstName!: string;

  @Field(() => String, { nullable: false, defaultValue: '' })
  lastName!: string;

  @Field(() => String, { nullable: false, defaultValue: '' })
  email!: string;

  @Field(() => String, { nullable: false, defaultValue: '' })
  password!: string;

  @Field(() => String, { nullable: false, defaultValue: '' })
  profileImage!: string;

  @Field(() => Role, { nullable: false, defaultValue: Role.User })
  role!: keyof typeof Role;

  @Field(() => Boolean, { nullable: false, defaultValue: true })
  isActive!: boolean;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;
}
