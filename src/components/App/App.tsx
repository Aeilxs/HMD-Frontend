import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import { themeDark, themeLight } from '../theme/theme';

import Nav from '../UI/Nav/Nav';
import Footer from '../UI/Footer/Footer';

import { useAppSelector } from '../../redux/hooks';
import { selectTheme } from '../../features/UI/uiSlice';
import Home from '../views/Home/Home';
import AuthPage from '../Authentication/AuthenticationPage';

import Drawer from '../UI/Drawer/Drawer';
import NotFound from '../404/NotFound';
import CustomScrollBar from '../UI/CustomScrollBar/CustomScrollBar';

function App(): JSX.Element {
  const isDark = useAppSelector(selectTheme);
  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <CssBaseline />
      <Nav />
      <Drawer />
      <CustomScrollBar>
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <Home />
              </Container>
            }
          />
          <Route
            path="/authentification"
            element={<AuthPage />}
          />
          <Route
            path="*"
            element={
              <Container>
                <NotFound />
              </Container>
            }
          />
        </Routes>
      </CustomScrollBar>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
