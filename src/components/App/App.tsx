import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Paper } from '@mui/material';

import { themeDark } from '../theme/theme';
import Nav from '../UI/Nav/Nav';
import Footer from '../UI/Footer/Footer';
// import { Route, Routes } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={themeDark}>
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
