import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from 'theme/theme.ts';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from 'providers/BreakpointsProvider.tsx';
import router from 'routes/router';
import { TaskProvider } from './context/TaskContext';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BreakpointsProvider>
        <CssBaseline />
        <TaskProvider>

        <RouterProvider router={router} />
        </TaskProvider>
        <ToastContainer />
      </BreakpointsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
