import { User } from 'models/user';
import { Request, Response } from 'express';
import { Registration } from 'models/registration';
import { getRenderHtml } from 'templates/renderer';

export const getAdmitCard = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) throw new Error('User id not found');

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const registration = await Registration.findOne({
      user: userId,
    }).populate('testCenter');

    if (!registration) throw new Error('Registration not found');
    const html = await getRenderHtml({
      name: user.name,
      fatherName: registration.fatherName,
      rollNumber: registration.rollNumber as any,
      category: registration.category,
      centre: registration.testCenter.address,
      gender: registration.gender,
      photo: registration.photograph,
      signature: registration.signature,
    });
    if (!html) throw new Error('Error in generating admit card');
    return res.status(200).send(html);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};
