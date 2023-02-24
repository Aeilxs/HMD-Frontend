import { Typography, Box, Paper } from '@mui/material';
import { useAppSelector } from '../../../redux/hooks';
import { selectTheme } from '../../../features/UI/uiSlice';
import { themeLight } from '../../theme/theme';
import FooterIcon from './FooterIcon/FooterIcon';

export default function Footer(): JSX.Element {
  const isDark = useAppSelector(selectTheme);
  const socials = [
    {
      network: 'facebook',
      link: 'https://www.facebook.com/',
    },
    {
      network: 'github',
      link: 'https://github.com/O-clock-Lara/projet-07-health-monitor-dashboard-front',
    },
    {
      network: 'linkedin',
      link: 'https://www.linkedin.com/',
    },
  ];

  return (
    <Paper elevation={5}>
      <Box
        component="footer"
        sx={{
          p: 2,
          borderTop: '1px solid grey',
          height: '12vh',
          color: 'white',
          backgroundColor: `${isDark ? '' : themeLight.palette.primary.main}`,
        }}
      >
        <Typography align="center">Nos réseaux</Typography>
        <Box
          sx={{
            m: 'auto',
            width: '10%',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {socials.map((element) => (
            <FooterIcon
              key={element.network}
              name={element.network}
              link={element.link}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
