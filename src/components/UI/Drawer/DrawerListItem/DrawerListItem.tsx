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
import { useAppDispatch } from '../../../../redux/hooks';
import { toggleDrawer } from '../../../../features/UI/uiSlice';

interface DrawerListItemProps {
  label: string;
  icon: 'food' | 'sleep' | 'exercises' | 'hydration' | 'smoke' | 'drugs';
}

/**
 * icons : 'food' | 'sleep' | 'exercises' | 'hydration' | 'smoke' | 'drugs'
 */
export default function DrawerListItem({ label, icon }: DrawerListItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ListItem
      onClick={() => dispatch(toggleDrawer())}
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          {icon === 'food' && <FastfoodIcon />}
          {icon === 'sleep' && <HotelIcon />}
          {icon === 'exercises' && <SportsHandballIcon />}
          {icon === 'hydration' && <LocalDrinkIcon />}
          {icon === 'smoke' && <SmokingRoomsIcon />}
          {icon === 'drugs' && <MedicationIcon />}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
