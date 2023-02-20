import { createTheme, Theme } from '@mui/material/styles';

export const themeDark: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#1be031',
    },
  },
  typography: {
    button: {
      fontWeight: 400,
    },
  },
});

export const themeLight: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#1be031',
    },
  },
  typography: {
    button: {
      fontWeight: 400,
    },
  },
});
