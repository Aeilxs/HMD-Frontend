import * as React from 'react';
import List from '@mui/material/List';

import { Box } from '@mui/system';
import DrawerListItem from '../DrawerListItem';

export default function DrawerList(): JSX.Element {
  return (
    <Box sx={{ width: '400px' }}>
      <List>
        <DrawerListItem
          label="Alimentation"
          icon="food"
        />
        <DrawerListItem
          label="Sommeil"
          icon="sleep"
        />
        <DrawerListItem
          label="Activité physique"
          icon="exercises"
        />
        <DrawerListItem
          label="Hydratation"
          icon="hydration"
        />
        <DrawerListItem
          label="Tabagisme"
          icon="smoke"
        />
        <DrawerListItem
          label="Traitement médical"
          icon="drugs"
        />
      </List>
    </Box>
  );
}
