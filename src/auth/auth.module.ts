import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { AdminStrategy, UserStrategy } from './strategies';

@Module({
  imports: [PassportModule, PrismaModule],
  providers: [AdminStrategy, UserStrategy],
  exports: [AdminStrategy, UserStrategy],
})
export class AuthModule {}
