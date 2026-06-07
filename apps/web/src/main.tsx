import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
// 1. Initialize the Query Client for server-state caching
const queryClient = new QueryClient();
// 2. Render the application using Router and Query Providers
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
