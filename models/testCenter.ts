import mongoose from 'mongoose';
import { BaseModel } from 'models';

export interface ITestCenter extends BaseModel {
  codeName: string;
  address: string;
  mobileNumber?: string;
  email?: string;
  deleted: boolean;
}

const testCenterSchema = new mongoose.Schema<ITestCenter>({
  address: { type: String, required: true },
  mobileNumber: { type: String },
  email: { type: String },
  deleted: { type: Boolean, default: false },
});

export const TestCenter = mongoose.model<ITestCenter>(
  'TestCenter',
  testCenterSchema
);
