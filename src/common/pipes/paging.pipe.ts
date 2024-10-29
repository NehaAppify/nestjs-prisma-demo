import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PageAndSearchArgs, SearchByArgs } from '../types/paginated.args';

@Injectable()
export class PagingPipe implements PipeTransform {
  userPaginationOrderByOptions: string[];

  constructor(orderByOptions: string[]) {
    this.userPaginationOrderByOptions = orderByOptions;
  }

  validateOrderBy(orderBy: string, options: string[]): string | undefined {
    if (orderBy) {
      if (options.includes(orderBy)) return undefined;
      else return 'Order by filter must be one of [' + options.join(', ') + ']';
    }
  }

  validateSearches(
    searchValue: SearchByArgs[],
    options: string[],
  ): string | undefined {
    searchValue.forEach((search) => {
      if (!options.includes(search.column)) {
        return 'Search by filter must be one of [' + options.join(', ') + ']';
      }
    });
    return undefined;
  }

  transform(value?: PageAndSearchArgs) {
    if (!value) return;
    const pagingValue = value.paging;
    const searchValue = value.search;
    if (!pagingValue && !searchValue) {
      return;
    }
    if (pagingValue) {
      if (pagingValue.page < 0)
        throw new BadRequestException('Page can not be negative');
      if (pagingValue.page > 0) {
        if (pagingValue.page != 0) pagingValue.page = pagingValue.page - 1;
      }

      if (pagingValue.limit < 0 || pagingValue.limit === 0)
        throw new BadRequestException('Limit can not be negative or zero');

      if (
        pagingValue.orderDirection !== 'asc' &&
        pagingValue.orderDirection !== 'desc'
      )
        throw new BadRequestException(
          'Order Direction must be [asc] or [desc]',
        );
      const validateOrderByError = this.validateOrderBy(
        pagingValue.orderBy,
        this.userPaginationOrderByOptions,
      );
      if (validateOrderByError) {
        throw new BadRequestException(validateOrderByError);
      }
    }
    if (searchValue) {
      const validateSearchByError = this.validateSearches(
        searchValue,
        this.userPaginationOrderByOptions,
      );
      if (validateSearchByError) {
        throw new BadRequestException(validateSearchByError);
      }
    }
    return value;
  }
}
