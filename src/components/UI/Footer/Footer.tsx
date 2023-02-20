import * as React from 'react';
import { IconButton, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer(): JSX.Element {
  return (
    <Box sx={{ borderTop: '1px solid grey' }}>
      <AppBar
        sx={{ p: 2 }}
        position="static"
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
          <IconButton
            onClick={() => window.open('https://www.facebook.com/')}
            sx={{ width: 'fit-content' }}
          >
            <FacebookIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open(
                'https://github.com/O-clock-Lara/projet-07-health-monitor-dashboard-front'
              )
            }
            sx={{ width: 'fit-content' }}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => window.open('https://www.linkedin.com/')}
            sx={{ width: 'fit-content' }}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
}
