import { SwipeableDrawer } from '@mui/material';
import { selectDrawerState, toggleDrawer } from '../../reducers/UI/uiSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import DrawerList from './DrawerList/DrawerList';

export interface DrawerListItemProps {
  label: string;
  link: string;
  icon: 'food' | 'sleep' | 'exercises' | 'hydration' | 'smoke' | 'drugs' | 'dashboard';
}

export default function Drawer(): JSX.Element {
  const isDrawerOpen = useAppSelector(selectDrawerState);
  const dispatch = useAppDispatch();

  return (
    <>
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
