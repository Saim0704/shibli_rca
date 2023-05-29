import { Request, Response } from 'express';
import { Registration } from 'models/registration';

export const getAllRegistrations = async (req: Request, res: Response) => {
  try {
    const allRegistrations = await Registration.find().lean().populate('user');
    return res.status(200).json(allRegistrations);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};
