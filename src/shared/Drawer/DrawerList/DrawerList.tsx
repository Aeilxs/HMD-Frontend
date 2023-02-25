import * as React from 'react';
import List from '@mui/material/List';

import { Box } from '@mui/system';
import DrawerListItem from '../DrawerListItem/DrawerListItem';

export default function DrawerList(): JSX.Element {
  return (
    <Box sx={{ width: '400px' }}>
      <List>
        <DrawerListItem
          label="Alimentation"
          link="/alimentation"
          icon="food"
        />
        <DrawerListItem
          label="Sommeil"
          link="/sommeil"
          icon="sleep"
        />
        <DrawerListItem
          label="Activité physique"
          link="/sport"
          icon="exercises"
        />
        <DrawerListItem
          label="Hydratation"
          link="/hydratation"
          icon="hydration"
        />
        <DrawerListItem
          label="Tabagisme"
          link="/tabagisme"
          icon="smoke"
        />
        <DrawerListItem
          label="Traitement médical"
          link="/medicaments"
          icon="drugs"
        />
      </List>
    </Box>
  );
}
