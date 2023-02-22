import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import { themeDark, themeLight } from '../theme/theme';

import { useAppSelector } from '../../redux/hooks';
import { selectTheme } from '../../features/UI/uiSlice';

import Drawer from '../UI/Drawer/Drawer';
import CustomScrollBar from '../UI/CustomScrollBar/CustomScrollBar';
import Footer from '../UI/Footer/Footer';
import Nav from '../UI/Nav/Nav';
import NotFound from '../404/NotFound';

import Home from '../views/Home/Home';
import ProfilePage from '../views/ProfilePage/ProfilePage';
import SportPage from '../views/SportPage/SportPage';
import FoodPage from '../views/FoodPage/FoodPage';
import DrugPage from '../views/DrugPage/DrugPage';
import SmokePage from '../views/SmokePage/SmokePage';
import SleepPage from '../views/SleepPage/SleepPage';
import HydrationPage from '../views/HydrationPage/HydrationPage';
import AuthPage from '../views/Authentication/AuthenticationPage';

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
            path="/profil"
            element={<ProfilePage />}
          />
          <Route
            path="/sport"
            element={<SportPage />}
          />
          <Route
            path="/alimentation"
            element={<FoodPage />}
          />
          <Route
            path="/medicaments"
            element={<DrugPage />}
          />
          <Route
            path="/tabagisme"
            element={<SmokePage />}
          />
          <Route
            path="/sleep"
            element={<SleepPage />}
          />
          <Route
            path="/hydratation"
            element={<HydrationPage />}
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
