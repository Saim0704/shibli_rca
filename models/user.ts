import mongoose from 'mongoose';
import { BaseModel, Document, PaginateModel } from 'models';
import paginate from 'mongoose-paginate-v2';

export const UserTypes = ['ADMIN', 'USER'] as const;
export type IUserType = (typeof UserTypes)[number];

export interface IUser extends BaseModel {
  name: string;
  password: string;
  email: string;
  type: IUserType;
  mobile: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, maxlength: 100 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true, enum: UserTypes },
    mobile: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.plugin(paginate);

export const User = mongoose.model<Document<IUser>, PaginateModel<IUser>>(
  'User',
  userSchema
);
