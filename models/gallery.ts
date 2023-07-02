import mongoose from 'mongoose';
import { BaseModel, Document, PaginateModel } from 'models';
import paginate from 'mongoose-paginate-v2';

export interface IGallery extends BaseModel {
  name: string;
  image: string;
  description?: string;
}

const gallerySchema = new mongoose.Schema<IGallery>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

gallerySchema.plugin(paginate);

export const Gallery = mongoose.model<
  Document<IGallery>,
  PaginateModel<IGallery>
>(',Gallery', gallerySchema);
