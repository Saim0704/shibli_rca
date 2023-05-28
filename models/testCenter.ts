import mongoose from 'mongoose';
import { BaseModel } from '.';

export interface ITestCenter extends BaseModel {
  codeName: string;
  address: string;
  mobileNumber?: string;
  email?: string;
}

const testCenterSchema = new mongoose.Schema<ITestCenter>({
  address: { type: String, required: true },
  mobileNumber: { type: String },
  email: { type: String },
});

export const TestCenter = mongoose.model<ITestCenter>('TestCenter', testCenterSchema);
