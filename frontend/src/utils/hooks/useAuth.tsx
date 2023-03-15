import { Auth } from 'aws-amplify';
import React, { createContext, useEffect, useState } from 'react';

interface UseAuth {
  isLoading: boolean;
  isAuthenticated: boolean;
  username: string;
}

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        setUsername(result.username);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log('authError', e);
        setUsername('');
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    isAuthenticated,
    username,
  };
};
