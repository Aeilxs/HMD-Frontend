import * as React from 'react';
import { Avatar, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export default function Nav(): JSX.Element {
  return (
    <Box sx={{ height: '10vh' }}>
      <AppBar sx={{ borderBottom: '1px solid grey' }}>
        <Toolbar>
          <MonitorHeartIcon
            fontSize="large"
            sx={{ mr: 2 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.5rem' }}
          >
            HMD
          </Typography>
          <Button
            sx={{ mr: 2 }}
            color="inherit"
            variant="outlined"
          >
            LOGOUT
          </Button>
          <Avatar sx={{ mr: 1 }}>A</Avatar>
          <IconButton>
            <LightModeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
