import { Request, Response } from 'express';
import { User } from 'models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    const newUsers = users.reduce((acc: any, user: any) => {
      return [
        ...acc,
        {
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          type: user.type,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      ];
    }, []);

    return res.status(200).json(newUsers);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};
