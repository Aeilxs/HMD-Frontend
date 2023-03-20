import * as React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import FastfoodIcon from '@mui/icons-material/Fastfood';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import MedicationIcon from '@mui/icons-material/Medication';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAppDispatch } from '../../../store/hooks';
import { toggleDrawer } from '../../../reducers/UI/uiSlice';
import { useNavigate } from 'react-router-dom';
import { DrawerListItemProps } from '../Drawer';

/**
 * icons : 'food' | 'sleep' | 'exercises' | 'hydration' | 'smoke' | 'drugs' | 'dashboard'
 */
export default function DrawerListItem({ label, icon, link }: DrawerListItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <ListItem
      onClick={() => {
        dispatch(toggleDrawer());
        navigate(link);
      }}
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          {icon === 'admin' && <AdminPanelSettingsIcon />}
          {icon === 'food' && <FastfoodIcon />}
          {icon === 'sleep' && <HotelIcon />}
          {icon === 'exercises' && <SportsHandballIcon />}
          {icon === 'hydration' && <LocalDrinkIcon />}
          {icon === 'smoke' && <SmokingRoomsIcon />}
          {icon === 'drugs' && <MedicationIcon />}
          {icon === 'dashboard' && <DashboardCustomizeIcon />}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
