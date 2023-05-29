import mongoose from 'mongoose';

export interface BaseModel {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  mongoose.set('debug', true);
  await mongoose.connect(process.env.MONGO_URI!!);
};

export default connectDb;
