import mongoose from 'mongoose';

export interface BaseModel {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Document<T> = Omit<mongoose.Document, '_id'> & T;
export type PaginateModel<T> = mongoose.PaginateModel<Document<T>>;
