import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import { themeDark, themeLight } from '../theme/theme';
import Home from '../Home/Home';

function App() {
  return (
    <>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <Container >
          <Home />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
