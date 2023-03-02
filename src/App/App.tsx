import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import { themeDark, themeLight } from '../theme/theme';

import { useAppSelector } from '../store/hooks';
import { selectTheme } from '../reducers/UI/uiSlice';

import Drawer from '../shared/Drawer/Drawer';
import CustomScrollBar from '../shared/CustomScrollBar/CustomScrollBar';
import Footer from '../shared/Footer/Footer';
import Nav from '../shared/Nav/Nav';
import NotFound from '../errors/NotFound';
import { selectIsLogged } from '../reducers/user/userSlice';

import Home from '../views/Home/Home';
import ProfilePage from '../views/ProfilePage/ProfilePage';
import SportPage from '../views/SportPage/SportPage';
import FoodPage from '../views/FoodPage/FoodPage';
import DrugPage from '../views/DrugPage/DrugPage';
import SmokePage from '../views/SmokePage/SmokePage';
import SleepPage from '../views/SleepPage/SleepPage';
import HydrationPage from '../views/HydrationPage/HydrationPage';
import AuthPage from '../views/Authentication/AuthenticationPage';
import DashboardPage from '../views/DashboardPage/DashboardPage';

function App(): JSX.Element {
  const isDark = useAppSelector(selectTheme);
  const isLogged = useAppSelector(selectIsLogged);

  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <CssBaseline />
      <Nav />
      <CustomScrollBar>
        <Drawer />
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
            element={isLogged ? <Navigate to="/profil" /> : <AuthPage />}
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
            path="/sommeil"
            element={<SleepPage />}
          />
          <Route
            path="/hydratation"
            element={<HydrationPage />}
          />
          <Route
            path="/dashboard"
            element={<DashboardPage />}
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
