import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import { themeDark, themeLight } from '../theme/theme';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectTheme } from '../reducers/UI/uiSlice';

import Drawer from '../shared/Drawer/Drawer';
import CustomScrollBar from '../shared/CustomScrollBar/CustomScrollBar';
import Footer from '../shared/Footer/Footer';
import Nav from '../shared/Nav/Nav';
import NotFound from '../errors/NotFound';

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
import { selectIsLogged, selectRoles, selectToken } from '../reducers/user/userSlice';
import AccessDenied from '../errors/AccessDenied';
import AdminPage from '../views/Admin/AdminPage';
import { fetchUser } from '../reducers/user/userMiddleware';

function App(): JSX.Element {
  const isDark = useAppSelector(selectTheme);
  const isLogged = useAppSelector(selectIsLogged);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const isAdmin = useAppSelector(selectRoles).includes('ROLE_ADMIN');
  // prettier-ignore
  const notGuardedRoutes = [
    { path: '/',                 component: <Home />          },
    { path: '*',                 component: <NotFound />      },
    { path: '/acces-refuse',     component: <AccessDenied />  },
    { path: '/authentification', component: <AuthPage />      },
  ];
  // prettier-ignore
  const userRoutes = [
    { path: '/alimentation',     component: <FoodPage />      },
    { path: '/dashboard',        component: <DashboardPage /> },
    { path: '/hydratation',      component: <HydrationPage /> },
    { path: '/medicaments',      component: <DrugPage />      },
    { path: '/profil',           component: <ProfilePage />   },
    { path: '/sommeil',          component: <SleepPage />     },
    { path: '/sport',            component: <SportPage />     },
    { path: '/tabagisme',        component: <SmokePage />     },
  ];
  // prettier-ignore
  const adminRoutes = [
    { path: '/admin',            component: <AdminPage />     },
  ];

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // dispatch(setIsLogged());
      // dispatch(fetchUser(token));
    }
  }, [dispatch, token]);

  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <CssBaseline />
      <Nav />
      <CustomScrollBar>
        {isLogged && <Drawer />}
        <Routes>
          {notGuardedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
          {userRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={isLogged ? route.component : <Navigate to="/acces-refuse" />}
            />
          ))}
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={isAdmin ? route.component : <Navigate to="/acces-refuse" />}
            />
          ))}
        </Routes>
      </CustomScrollBar>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
