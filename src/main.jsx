import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary, StagingGate } from './components/common';
import router from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StagingGate>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </StagingGate>
    </ErrorBoundary>
  </React.StrictMode>,
);
