import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateFAQInput } from 'src/types/dto/faq.dto';
import { FAQ } from 'src/types/faq';

/** Faqs service */
@Injectable()
export class FAQService {
  constructor(private prisma: PrismaService) {}

  /** Create faq */
  async create(data: { question: string; answer: string }): Promise<FAQ> {
    return this.prisma.faq.create({
      data,
    });
  }

  /** Get all faqs */
  async getFAQs(): Promise<FAQ[]> {
    return this.prisma.faq.findMany();
  }

  /** Get faq by id */
  async get(id: number): Promise<FAQ> {
    return this.prisma.faq.findUnique({
      where: { id },
    });
  }

  /** Update faq */
  async update(data: UpdateFAQInput): Promise<FAQ> {
    return this.prisma.faq.update({
      where: { id: data.id },
      data,
    });
  }

  /** Delete faq by id */
  async delete(id: number): Promise<FAQ> {
    return this.prisma.faq.delete({
      where: { id },
    });
  }
}
