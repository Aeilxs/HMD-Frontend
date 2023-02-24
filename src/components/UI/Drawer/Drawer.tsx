import * as React from 'react';
import { IconButton, SwipeableDrawer } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { selectDrawerState, toggleDrawer } from '../../../features/UI/uiSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import DrawerList from './DrawerList/DrawerList';
import { selectIsLogged } from '../../../features/user/userSlice';
import { useLocation } from 'react-router-dom';

export default function Drawer(): JSX.Element {
  const location = useLocation();
  const isLogged = useAppSelector(selectIsLogged);
  const isDrawerOpen = useAppSelector(selectDrawerState);
  const dispatch = useAppDispatch();
  const { pathname } = location;
  const isHomeOrAuth = pathname === '/' || pathname === '/authentification';

  return (
    <>
      {isLogged && !isHomeOrAuth && (
        <IconButton
          onClick={() => dispatch(toggleDrawer())}
          sx={{ position: 'absolute', right: '0.1', top: '50%' }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}

      <SwipeableDrawer
        sx={{ position: 'relative' }}
        open={isDrawerOpen}
        anchor="left"
        onClose={() => dispatch(toggleDrawer())}
        onOpen={() => dispatch(toggleDrawer())}
      >
        <DrawerList />
      </SwipeableDrawer>
    </>
  );
}
