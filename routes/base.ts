import { Request } from 'express';

export type PaginatedRequestQueryParams<
  Body = object,
  Params = object
> = Request<
  object,
  object,
  Body,
  Params & {
    pageSize: number;
    pageNumber: number;
  }
>;
