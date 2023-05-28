import mongoose from "mongoose";

export const UserTypes = ['ADMIN', 'USER'] as const;

export interface IUser {
  email: string;
  type: typeof UserTypes[number];
  password: string;
  name: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: UserTypes,
      default: "USER",
      trim: true,
    },
    password: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
