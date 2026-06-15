'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    // https://github.com/mui/material-ui/issues/31185
    MuiDialogContent: {
      styleOverrides: {
        root: { overflow: 'initial' },
      },
    },
  },
});

export default theme;
