import * as React from 'react';
import { IconButton, Typography, Box, Paper } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer(): JSX.Element {
  return (
    <Paper elevation={5}>
      <Box
        component="footer"
        sx={{ p: 2, borderTop: '1px solid grey', height: '12vh' }}
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
          <IconButton onClick={() => window.open('https://www.facebook.com/')}>
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
      </Box>
    </Paper>
  );
}
