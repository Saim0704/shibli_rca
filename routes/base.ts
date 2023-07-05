import { Request } from 'express';

export type PaginatedRequestQueryParams<Body = any, Params = any> = Request<
  object,
  object,
  Body,
  Params & {
    pageSize: number;
    pageNumber: number;
  }
>;
