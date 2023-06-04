import { IRegistration } from '../../types/models';

export type IRegisterPayload = Omit<IRegistration, 'user'> & {
  user?: IRegistration['user'];
  payment: boolean;
};

export type BasicInfo = Pick<
  IRegisterPayload,
  | 'gender'
  | 'fatherName'
  | 'motherName'
  | 'dateOfBirth'
  | 'mobileNumber'
  | 'phoneNumber'
>;

const basicInfo: BasicInfo = {
  dateOfBirth: '' as any,
  fatherName: '',
  gender: '',
  mobileNumber: '',
  motherName: '',
  phoneNumber: '',
};

export type Addresses = Pick<
  IRegisterPayload,
  'permanentAddress' | 'correspondenceAddress'
>;

const addresses: Addresses = {
  correspondenceAddress: {
    cityOrTown: '',
    district: '',
    landMark: '',
    postalCode: '',
    state: '',
  },
  permanentAddress: {
    cityOrTown: '',
    district: '',
    landMark: '',
    postalCode: '',
    state: '',
  },
};

export type IEducation = Pick<IRegisterPayload, 'education'>['education'];

const defaultEducation: IEducation['matriculation'] = {
  boardOrUni: '',
  percentage: 0,
  passYear: 2000,
};

const education: IEducation = {
  matriculation: defaultEducation,
  intermediate: defaultEducation,
  graduation: defaultEducation,
  other: defaultEducation,
};

export type IEarlierCompetitiveExams = Pick<
  IRegisterPayload,
  'earlierCompetitiveExams'
>['earlierCompetitiveExams'];

const earlierCompetitiveExams: IEarlierCompetitiveExams = [];

export type IAgreements = Pick<
  IRegisterPayload,
  'agreeToTerms'
>['agreeToTerms'];
const agreeToTerms: IAgreements = {
  informationIsCorrect: true,
  rightToChange: true,
};

export type IUploads = Pick<
  IRegisterPayload,
  'photograph' | 'aadharCard' | 'signature' | 'lastSemesterCertificate'
>;
const uploads: IUploads = {
  aadharCard: '',
  photograph: '',
  signature: '',
  lastSemesterCertificate: '',
};

export const defaultPayload: IRegisterPayload = {
  ...basicInfo,
  ...addresses,
  education,
  earlierCompetitiveExams,
  agreeToTerms,
  ...uploads,
  currentStep: 0,
  testCenter: '' as any,
  payment: false,
  transactionId: '',
  rollNumber: '',
  category: '',
  languageOfExam: '',
};
