import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { themeDark } from '../theme/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={themeDark}>
        <CssBaseline />
        <div>initial commit</div>
      </ThemeProvider>
    </>
  );
}

export default App;
