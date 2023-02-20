import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Paper } from '@mui/material';

import { themeDark } from '../theme/theme';
// import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Container>
        <Paper elevation={1}>
          {/* <Routes>
            <Route
              path="/"
              element={}
            />
          </Routes> */}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
