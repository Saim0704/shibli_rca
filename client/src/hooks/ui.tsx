import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export type IUi = {
  isMobile: boolean;
  loading: boolean;
};

export const defaultUiState: IUi = {
  isMobile: true,
  loading: false,
};

export const uiContext = createContext<
  [ui: IUi, setUi: Dispatch<SetStateAction<IUi>>]
>([defaultUiState, () => {}]);

export const UiContextProvider = ({ children }: PropsWithChildren) => {
  const [ui, setUi] = useState(defaultUiState);

  return (
    <uiContext.Provider value={[ui, setUi]}>{children}</uiContext.Provider>
  );
};
