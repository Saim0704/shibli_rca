import mongoose from 'mongoose';

export interface IAdmitCard {
  _id?: string;
  email: string;
  url: string;
}

const admitCardSchema = new mongoose.Schema<IAdmitCard>({
  email: { type: String, required: true, unique: true },
  url: { type: String, required: true },
});

export const AdmitCard = mongoose.model<IAdmitCard>(
  'AdmitCard',
  admitCardSchema
);
