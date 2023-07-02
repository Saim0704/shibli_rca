import mongoose from 'mongoose';
import { BaseModel, Document, PaginateModel } from 'models';
import paginate from 'mongoose-paginate-v2';

export interface IAchievement extends BaseModel {
  title: string;
  subtitle?: string;
  description: string;
  photo?: string;
}

const achievementSchema = new mongoose.Schema<IAchievement>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true }
);

achievementSchema.plugin(paginate);

export const Achievement = mongoose.model<
  Document<IAchievement>,
  PaginateModel<IAchievement>
>('Achievement', achievementSchema);
