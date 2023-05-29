import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AppContainer from './components/root';

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <AppContainer>
          <Routes></Routes>
        </AppContainer>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
