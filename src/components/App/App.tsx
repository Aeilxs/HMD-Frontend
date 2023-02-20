import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Paper } from '@mui/material';

import { themeDark } from '../theme/theme';

function App() {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Container>
        <Paper elevation={1}>{/* composants here */}</Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
