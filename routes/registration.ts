import { Request, Response } from 'express';
import { Registration } from 'models/registration';

export const getAllRegistrations = async (req: Request, res: Response) => {
  try {
    const allRegistrations = await Registration.find({ deleted: false })
      .lean()
      .populate('user')
      .populate('testCenter');
    return res.status(200).json(allRegistrations);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    await Registration.findByIdAndUpdate(_id, { deleted: true });
    return res.status(200).json('Registration deleted');
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const registerForExam = async (req: Request, res: Response) => {
  try {
    const count = await Registration.countDocuments();
    const rollNumber = `${String(new Date().getFullYear()).slice(2, 4)}${String(
      count + 1
    ).padStart(4, '0')}`;
    const registration = new Registration({
      ...req.body,
      rollNumber: rollNumber,
      registerComplete: true,
    });
    await registration.save();
    return res.status(200).json({ message: 'Registration created' });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const changeTestCenter = async (req: Request, res: Response) => {
  try {
    await Registration.findByIdAndUpdate(req.body._id, {
      testCenter: req.body.testCenter,
    });

    return res.status(200).json({ message: 'Registration created' });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};
