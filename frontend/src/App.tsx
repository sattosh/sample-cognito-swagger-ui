import React from 'react';
import * as AWSAmplify from './utils/aws';
import { MuiThemeProvider } from './utils/theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProvideAuth } from './utils/hooks';
import { privateRoutes, publicRoutes } from './constants/routes';
import { PrivateRoute } from './components/route';

/** amplifyの情報を更新する */
AWSAmplify.configure();

export const App = () => {
  return (
    <MuiThemeProvider>
      <ProvideAuth>
        <CssBaseline />
        <Router>
          <Routes>
            {publicRoutes.map(({ path, container: Container }, index) => {
              return (
                <Route
                  path={path}
                  key={`public-route-${index}`}
                  element={
                    <>
                      <Container />
                    </>
                  }
                />
              );
            })}
            {privateRoutes.map(({ path, container: Container }, index) => {
              return (
                <Route
                  path={path}
                  key={`private-route-${index}`}
                  element={
                    <PrivateRoute>
                      <Container />
                    </PrivateRoute>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </ProvideAuth>
    </MuiThemeProvider>
  );
};
