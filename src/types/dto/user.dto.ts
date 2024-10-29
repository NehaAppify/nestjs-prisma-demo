import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '@prisma/client';
import { Field, InputType, Int } from '@nestjs/graphql';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  profileImage: string;

  @IsString()
  @IsNotEmpty()
  role: keyof typeof Role;
}

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  email?: string;

  @Field(() => String, { nullable: false })
  firstName?: string;

  @Field(() => String, { nullable: false })
  lastName?: string;

  @Field(() => String, { nullable: false })
  password?: string;

  @Field(() => Role, { nullable: false })
  role?: keyof typeof Role;
}
