import { createTheme, Theme, ThemeProvider } from '@mui/material';
import React from 'react';

export const defaultTheme = createTheme();

export type MuiThemeProviderProps = {
  children: React.ReactNode;
  theme?: Theme;
};

export const MuiThemeProvider = (props: MuiThemeProviderProps) => {
  const { children, theme } = props;
  return <ThemeProvider theme={theme || defaultTheme}>{children}</ThemeProvider>;
};
