import mongoose from 'mongoose';
import { BaseModel, Document, PaginateModel } from 'models';
import paginate from 'mongoose-paginate-v2';

export interface IEvent extends BaseModel {
  name: string;
  location: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  contact?: string;
}

const eventSchema = new mongoose.Schema<IEvent>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    contact: { type: String },
  },
  { timestamps: true }
);

eventSchema.plugin(paginate);

export const Event = mongoose.model<Document<IEvent>, PaginateModel<IEvent>>(
  'Event',
  eventSchema
);
