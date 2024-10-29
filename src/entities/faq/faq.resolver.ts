import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminGuard, UserGuard } from '../../auth/guards';
import { FAQService } from './faq.service';
import { CreateFAQInput, UpdateFAQInput } from 'src/types/dto/faq.dto';
import { FAQ } from 'src/types/faq';

/** FAQ resolver */
@Resolver(() => FAQ)
export class FAQResolver {
  constructor(private readonly faqService: FAQService) {}

  /** Create faq */
  @UseGuards(UserGuard)
  @Mutation(() => FAQ)
  async createFAQ(@Args('input') input: CreateFAQInput): Promise<FAQ> {
    return this.faqService.create(input);
  }

  /** Get all faqs */
  @UseGuards(AdminGuard, UserGuard)
  @Query(() => [FAQ], { name: 'faqs' })
  async getFAQs(): Promise<FAQ[]> {
    return this.faqService.getFAQs();
  }

  /** Update faqs */
  @UseGuards(AdminGuard, UserGuard)
  @Mutation(() => FAQ)
  async updateFAQ(@Args('input') input: UpdateFAQInput): Promise<FAQ> {
    return this.faqService.update(input);
  }

  /** Delete faqs */
  @UseGuards(AdminGuard)
  @Mutation(() => FAQ)
  async deleteFAQ(@Args('id', { type: () => Int }) id: number): Promise<FAQ> {
    return this.faqService.delete(id);
  }
}
