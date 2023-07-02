import mongoose from 'mongoose';
import { BaseModel, Document, PaginateModel } from 'models';
import paginate from 'mongoose-paginate-v2';

export interface INotice extends BaseModel {
  title: string;
  description: string;
  issuedBy: string;
}

const noticeSchema = new mongoose.Schema<INotice>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    issuedBy: { type: String, required: true },
  },
  { timestamps: true }
);

noticeSchema.plugin(paginate);

export const Notice = mongoose.model<Document<INotice>, PaginateModel<INotice>>(
  'Notice',
  noticeSchema
);
