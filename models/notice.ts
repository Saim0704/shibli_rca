import mongoose from 'mongoose';
import { BaseModel } from '.';

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

export const Notice = mongoose.model<INotice>('Notice', noticeSchema);
