import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { routes } from './routes/routes.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import DataProvider from './context/DataContext/DataProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={routes} />
      </DataProvider>
    </AuthProvider>
  </StrictMode>
);
