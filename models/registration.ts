import mongoose from 'mongoose';
import { BaseModel } from 'models';
import { IUser } from 'models/user';
import { ITestCenter } from 'models/testCenter';

export interface IAddress {
  cityOrTown: string;
  state: string;
  district: string;
  landMark: string;
  postalCode: string;
}

export interface IEducation {
  passYear: number;
  percentage: number;
  boardOrUni: string;
}

export interface IEarlierCompetitiveExams {
  name: string;
  year: number;
  cleared: boolean;
}

export interface IRegistration extends BaseModel {
  user: IUser; // ObjectId
  currentStep: number;
  gender: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date; // also calculate age from this
  mobileNumber: string;
  phoneNumber?: string;
  permanentAddress: IAddress;
  correspondenceAddress: IAddress;
  education: {
    matriculation: IEducation;
    intermediate: IEducation;
    graduation: IEducation;
    other: IEducation;
  };
  languageOfExam: string;
  testCenter: ITestCenter; // ObjectId
  transactionId: string;
  earlierCompetitiveExams: Array<IEarlierCompetitiveExams>;
  agreeToTerms: {
    informationIsCorrect: boolean;
    rightToChange: boolean;
  };
  rollNumber?: string; // generated by backend
  category: string; // General, SC/ST, OBC, PWD, Gen-EWS, EWS
  registerComplete?: boolean;
  // Static Assets
  photograph: string;
  signature: string;
  aadharCard?: string;
  lastSemesterCertificate?: string;
  deleted?: boolean;
  transaction: string;
}

export const genders = ['M', 'F', 'O'] as const;

const addressSchema = {
  landmark: { type: String },
  postalCode: { type: String, required: true },
  cityOrTown: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
};

const educationSchema = {
  passYear: { type: Number, required: true },
  percentage: { type: Number, required: true },
  boardOrUni: { type: String },
};

const registrationSchema = new mongoose.Schema<IRegistration>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    currentStep: { type: Number, default: 0 },
    gender: { type: String, enum: genders, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    mobileNumber: { type: String, required: true },
    phoneNumber: { type: String },
    permanentAddress: addressSchema,
    correspondenceAddress: addressSchema,
    education: {
      matriculation: educationSchema,
      intermediate: educationSchema,
      graduation: educationSchema,
      other: {
        education: { type: String, default: '' },
        passYear: { type: Number, default: '' },
        percentage: { type: Number, default: '' },
        boardOrUni: { type: String, default: '' },
      },
    },
    testCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestCenter',
      required: true,
    },
    transactionId: { type: String, required: true },
    agreeToTerms: {
      informationIsCorrect: { type: Boolean, required: true },
      rightToChange: { type: Boolean, required: true },
    },
    languageOfExam: { type: String, required: true },
    category: { type: String, required: true },
    rollNumber: { type: String },
    registerComplete: { type: Boolean, default: false },
    photograph: { type: String, required: true },
    signature: { type: String, required: true },
    aadharCard: { type: String },
    lastSemesterCertificate: { type: String },
    deleted: { type: Boolean, default: false },
    earlierCompetitiveExams: [
      {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        cleared: { type: Boolean, required: true },
      },
    ],
    transaction: { type: String, required: true },
  },
  { timestamps: true }
);

export const Registration = mongoose.model<IRegistration>(
  'Registration',
  registrationSchema
);
