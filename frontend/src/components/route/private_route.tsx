import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../utils/hooks';

/** 認証をかける */
export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  console.log(isAuthenticated);
  if (isLoading)
    return (
      <>
        <CircularProgress />
      </>
    );

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" state={{ from: location }} />;
};
