import mongoose from 'mongoose';
import { BaseModel, Document, PaginateModel } from 'models';
import paginate from 'mongoose-paginate-v2';

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

testCenterSchema.plugin(paginate);

export const TestCenter = mongoose.model<
  Document<ITestCenter>,
  PaginateModel<ITestCenter>
>('TestCenter', testCenterSchema);
