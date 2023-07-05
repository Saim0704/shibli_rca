import { User } from 'models/user';
import { Request, Response } from 'express';
import { getHtmlData, savePdfFile } from 'templates/renderer';
import { Registration } from 'models/registration';

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
    const html = await savePdfFile({
      name: user.name,
      email: user.email,
      fatherName: registration.fatherName,
      rollNumber: registration.rollNumber as any,
      category: registration.category,
      centre: registration.testCenter.address,
      gender: registration.gender,
      photo: registration.photograph,
      signature: registration.signature,
      language: registration.languageOfExam,
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

export const getAdmitCardByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    if (!email) throw new Error('Email not found');

    const data = await getHtmlData(email);
    return res.status(200).send(data);
  } catch (err: any) {
    const errMsg = `<div style="display: flex; align-items: center; justify-content: center; height: 100vh">
		<h1 style="color: red">Your registration was not found</h1>
		</div>`;
    return res.status(404).send(errMsg);
  }
};
