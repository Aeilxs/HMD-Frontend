import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import { themeDark, themeLight } from '../theme/theme';

import Nav from '../UI/Nav/Nav';
import Footer from '../UI/Footer/Footer';

import { useAppSelector } from '../../redux/hooks';
import { selectTheme } from '../../features/UI/uiSlice';
import Home from '../Home/Home';
import AuthPage from '../Authentication/AuthenticationPage';

import Drawer from '../UI/Drawer/Drawer';
import NotFound from '../404/NotFound';

function App(): JSX.Element {
  const isDark = useAppSelector(selectTheme);
  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <CssBaseline />
      <Nav />
      <Drawer />
      <Container sx={{ minHeight: '100vh' }}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/authentification"
            element={<AuthPage />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
