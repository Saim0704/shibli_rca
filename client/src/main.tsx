import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UiContextProvider } from './hooks/ui.tsx';
import { AuthContextProvider } from './hooks/auth.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <UiContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </UiContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
