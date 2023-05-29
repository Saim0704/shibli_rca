import { Request, Response } from 'express';
import { Registration } from 'models/registration';
import { TestCenter } from 'models/testCenter';
import mongoose from 'mongoose';

export const initialGet = async (req: Request, res: Response) => {
  try {
    if (!req.authenticated) throw new Error('Unauthorized');

    const registration = await Registration.findOne({
      user: new mongoose.Types.ObjectId(req.user?._id),
    }).populate('user');
    const testCenter = await TestCenter.findById(
      registration?.testCenter
    ).lean();

    return res.status(200).json({
      registration,
      testCenter,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};
