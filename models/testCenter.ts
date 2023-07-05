import mongoose from 'mongoose';
import { BaseModel, Document, PaginateModel } from 'models';
import paginate from 'mongoose-paginate-v2';

export interface ITestCenter extends BaseModel {
  address: string;
  code: string;
  location: string;
  deleted: boolean;
}

const testCenterSchema = new mongoose.Schema<ITestCenter>({
  address: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  location: { type: String, required: true },
  code: { type: String, required: true },
});

testCenterSchema.plugin(paginate);

export const TestCenter = mongoose.model<
  Document<ITestCenter>,
  PaginateModel<ITestCenter>
>('TestCenter', testCenterSchema);
