import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchValue {
  @Field(() => String, { nullable: true })
  enum?: string;

  @Field(() => Int, { nullable: true })
  int?: number;

  @Field(() => Boolean, { nullable: true })
  bool?: boolean;

  @Field(() => String, { nullable: true })
  string?: string;

  @Field(() => [Int], { nullable: true })
  arrayOfIds?: number[];

  @Field(() => String, { nullable: true })
  query?: string;
}

@InputType()
export class SearchByArgs {
  @Field(() => SearchValue)
  searchValue: SearchValue;

  @Field(() => String)
  column: string;
}

@InputType()
export class PagingArgs {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => String)
  orderBy: string;

  @Field(() => String)
  orderDirection: string;
}

@InputType()
export class PageAndSearchArgs {
  @Field(() => PagingArgs, { nullable: true })
  paging?: PagingArgs;

  @Field(() => [SearchByArgs], { nullable: true })
  search?: SearchByArgs[] = [];
}
