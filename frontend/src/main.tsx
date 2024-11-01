import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { LoadingProvider } from './context/loadingContext'; 
import { SnackbarProvider } from './context/SnackBarProvider.tsx';
import {themes} from './utils/themes.ts'
import { ThemeProvider } from '@mui/material';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={themes}>
      <LoadingProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </LoadingProvider>
    </ThemeProvider>
  </StrictMode>
);
