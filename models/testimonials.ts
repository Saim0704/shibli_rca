import mongoose from 'mongoose';
import { BaseModel, Document, PaginateModel } from 'models';
import paginate from 'mongoose-paginate-v2';

export interface ITestimonial extends BaseModel {
  name: string;
  role: string;
  photo: string;
  testimonial: string;
}

const testimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String, required: true },
    testimonial: { type: String, required: true },
  },
  { timestamps: true }
);

testimonialSchema.plugin(paginate);

export const Testimonial = mongoose.model<
  Document<ITestimonial>,
  PaginateModel<ITestimonial>
>('Testimonial', testimonialSchema);
