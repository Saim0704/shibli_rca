import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { IUser } from '../types/models';

interface IMe {
  authenticated: boolean;
  user: IUser | null;
  loading: boolean;
}

const authDefault: IMe = {
  authenticated: false,
  loading: true,
  user: null,
};

export const authContext = createContext<
  [auth: IMe, setAuth: Dispatch<SetStateAction<IMe>>]
>([authDefault, () => {}]);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState(authDefault);

  return (
    <authContext.Provider value={[auth, setAuth]}>
      {children}
    </authContext.Provider>
  );
};
