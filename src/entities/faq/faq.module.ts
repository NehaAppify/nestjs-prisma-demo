import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { FAQService } from './faq.service';
import { FAQResolver } from './faq.resolver';

@Module({
  imports: [PrismaModule],
  providers: [FAQService, FAQResolver],
  exports: [FAQService],
})
export class FAQModule {}
