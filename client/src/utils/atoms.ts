import { atom } from 'recoil';
import {
  IEvent,
  IGallery,
  INotice,
  IRegistration,
  ITestCenter,
  IUser,
} from '../types/models';

interface IMe {
  authenticated: boolean;
  user: IUser | null;
  loading: boolean;
}
export const meAtom = atom<IMe>({
  key: 'me',
  default: {
    authenticated: false,
    loading: true,
    user: null,
  },
});

export const usersAtom = atom<Array<Partial<IUser>>>({
  key: 'users',
  default: [],
});

export const eventsAtom = atom<Array<Partial<IEvent>>>({
  key: 'events',
  default: [],
});

export const galleryAtom = atom<Array<Partial<IGallery>>>({
  key: 'gallery',
  default: [],
});

export const noticeAtom = atom<Array<Partial<INotice>>>({
  key: 'notice',
  default: [],
});

export const testCenterAtom = atom<Array<Partial<ITestCenter>>>({
  key: 'testCenter',
  default: [],
});

export interface IUi {
  isMobile: boolean;
  loading: boolean;
}

export const uiAtom = atom<IUi>({
  key: 'ui',
  default: {
    isMobile: true,
    loading: false,
  },
});

export const registrationAtom = atom<Array<Partial<IRegistration>>>({
  key: 'registration',
  default: [],
});
