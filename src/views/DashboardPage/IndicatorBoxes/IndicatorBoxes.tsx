import { Box } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import MedicationIcon from '@mui/icons-material/Medication';
import IndicatorBox from './Box/Box';

const indicators = [
  {
    name: 'Alimentation',
    icon: <FastfoodIcon />,
    color: '#ff0039',
    link: '/alimentation',
  },
  {
    name: 'Activité physique',
    icon: <SportsHandballIcon />,
    color: '#f8816e',
    link: '/sport',
  },
  {
    name: 'Sommeil',
    icon: <HotelIcon />,
    color: '#f9b103',
    link: '/sommeil',
  },
  {
    name: 'Hydratation',
    icon: <LocalDrinkIcon />,
    color: '#71afe2',
    link: '/hydratation',
  },
  {
    name: 'Tabagisme',
    icon: <SmokingRoomsIcon />,
    color: '#9a4a8a',
    link: '/tabagisme',
  },
  {
    name: 'Traitement médical',
    icon: <MedicationIcon />,
    color: '#00a697',
    link: '/medicaments',
  },
];

const IndicatorsPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: ['column', 'row', 'row'],
        flexWrap: ['nowrap', 'wrap', 'wrap', 'nowrap'],
        alignItems: 'center',
        gap: '20px',
        gridColumn: '1 / span 2',
        justifyContent: 'center',
      }}
    >
      {indicators.map(({ name, icon, color, link }) => (
        <IndicatorBox
          key={name}
          name={name}
          icon={icon}
          color={color}
          link={link}
        />
      ))}
    </Box>
  );
};

export default IndicatorsPage;
