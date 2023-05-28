import mongoose from "mongoose";
import { BaseModel } from ".";

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

export const Gallery = mongoose.model<IGallery>("Gallery", gallerySchema);
