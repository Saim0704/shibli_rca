import { Response } from 'express';
import { User } from 'models/user';
import { PaginatedRequestQueryParams } from './base';

export const getUsers = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  try {
    const users = await User.paginate(
      {},
      {
        sort: { createdAt: -1 },
        lean: true,
        page: req.query.pageNumber,
        limit: req.query.pageSize,
        project: {
          name: 1,
          email: 1,
          mobile: 1,
          type: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      }
    );

    return res.status(200).json(users);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};
