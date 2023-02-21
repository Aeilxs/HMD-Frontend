import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Paper } from '@mui/material';
import { themeDark, themeLight } from '../theme/theme';

import Nav from '../UI/Nav/Nav';
import Footer from '../UI/Footer/Footer';

import { useAppSelector } from '../../redux/hooks';
import { selectTheme } from '../../features/UI/uiSlice';

function App(): JSX.Element {
  const isDark = useAppSelector(selectTheme);
  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <CssBaseline />
      <Nav />
      <Container sx={{ minHeight: '100vh' }}>
        <Paper elevation={1}>
          {/* <Routes>
            <Route
              path="/"
              element={}
            />
          </Routes> */}
        </Paper>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
