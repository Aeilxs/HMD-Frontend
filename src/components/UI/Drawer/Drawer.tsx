import * as React from 'react';

import { IconButton, SwipeableDrawer } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { selectDrawerState, toggleDrawer } from '../../../features/UI/uiSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import DrawerList from './DrawerList/DrawerListItem/DrawerList';
import { selectIsLogged } from '../../../features/user/userSlice';
export default function Drawer(): JSX.Element {
  const isLogged = useAppSelector(selectIsLogged);
  const isDrawerOpen = useAppSelector(selectDrawerState);
  const dispatch = useAppDispatch();
  return (
    <>
      {isLogged && (
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
