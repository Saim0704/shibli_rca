import mongoose from 'mongoose';

export interface BaseModel {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
