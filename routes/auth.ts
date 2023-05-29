import { Otp } from 'models/otp';
import { IUser, User } from 'models/user';
import { Request, Response } from 'express';
import { compareHash, getHash } from 'utils/auth';
import sendMailForResetPassword from 'mailer/reset-password';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Bad request');
    //
    //	TODO
    //
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const getMeInitial = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) throw new Error('Bad request');

    const hash = await getHash(password);
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists');

    const user = new User<IUser>({ name, email, password: hash, type: 'USER' });
    await user.save();
    return res.status(200).json({ message: 'User created' });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPwd, newPwd, userId } = req.body;
    if (!currentPwd || !newPwd) throw new Error('Insufficient Data');

    if (!userId) throw new Error('Unauthorized');
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const isValidPwd = compareHash(currentPwd, user.password);
    if (!isValidPwd) throw new Error('Password not matched');

    const hashedPassword = await getHash(newPwd);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, step } = req.body;
    if (!email || !step) throw new Error('Bad Input');

    let otp: number;
    const foundOtp = await Otp.findOne({ email });
    if (foundOtp) otp = foundOtp.otp;
    else {
      const newOtp = new Otp({
        email,
        otp: Math.floor(100000 + Math.random() * 900000),
      });
      await newOtp.save();
      otp = newOtp.otp;
    }
    sendMailForResetPassword({ userEmail: email, otp: otp.toString() });
    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, step } = req.body;
    if (!email || !step) throw new Error('Bad Input');

    const { otp, password } = req.body;
    if (!otp || !password) throw new Error('Bad Input');

    const foundOtp = await Otp.findOne({ email });
    if (!foundOtp || foundOtp.otp.toString() !== otp.toString()) {
      throw new Error('Invalid OTP');
    }

    await Otp.deleteOne({ email });
    const newPassword = await getHash(password);
    await User.findOneAndUpdate({ email }, { password: newPassword });
    return res.status(200).json({ message: 'Password Updated successfully' });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};
