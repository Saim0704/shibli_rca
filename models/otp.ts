import mongoose from 'mongoose';

export interface IOtp {
  email: string;
  otp: number;
}

const otpSchema = new mongoose.Schema<IOtp>({
  email: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
});

export const Otp = mongoose.model<IOtp>('Otp', otpSchema);
