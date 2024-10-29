import { ValidationPipe } from '@nestjs/common';
import { PagingPipe } from './paging.pipe';

export const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
});

export const userPagingPipe = new PagingPipe([
  'createdAt',
  'updatedAt',
  'email',
  'firstName',
  'lastName',
  'role',
]);
