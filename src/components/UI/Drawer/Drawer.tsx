import * as React from 'react';

import { SwipeableDrawer } from '@mui/material';

import { selectDrawerState, toggleDrawer } from '../../../features/UI/uiSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import DrawerList from './DrawerList/DrawerListItem/DrawerList';

export default function Drawer(): JSX.Element {
  const isDrawerOpen = useAppSelector(selectDrawerState);
  const dispatch = useAppDispatch();
  return (
    <>
      <SwipeableDrawer
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
