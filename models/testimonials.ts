import mongoose from 'mongoose';
import { BaseModel } from '.';

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

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
