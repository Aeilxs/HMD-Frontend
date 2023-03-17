import List from '@mui/material/List';

import { Box } from '@mui/system';
import DrawerListItem from '../DrawerListItem/DrawerListItem';
import { DrawerListItemProps } from '../Drawer';

export default function DrawerList(): JSX.Element {
  const list: DrawerListItemProps[] = [
    { label: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { label: 'Alimentation', link: '/alimentation', icon: 'food' },
    { label: 'Sommeil', link: '/sommeil', icon: 'sleep' },
    { label: 'Activité physique', link: '/sport', icon: 'exercises' },
    { label: 'Hydratation', link: '/hydratation', icon: 'hydration' },
    { label: 'Tabagisme', link: '/tabagisme', icon: 'smoke' },
    { label: 'Traitement médical', link: '/medicaments', icon: 'drugs' },
  ];

  return (
    <Box sx={{ width: '400px' }}>
      <List>
        {list.map((element) => (
          <DrawerListItem
            key={element.icon}
            {...element}
          />
        ))}
      </List>
    </Box>
  );
}
