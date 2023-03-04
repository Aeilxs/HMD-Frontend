import * as React from 'react';
import { Avatar, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTheme, toggleDrawer, toggleTheme } from '../../reducers/UI/uiSlice';
import { DarkMode } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { onLogout, selectFirstName, selectIsLogged } from '../../reducers/user/userSlice';

export default function Nav(): JSX.Element {
  const isDark = useAppSelector(selectTheme);
  const isLogged = useAppSelector(selectIsLogged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initial = useAppSelector(selectFirstName).charAt(0).toUpperCase()
  return (
    <Box sx={{ display: 'block' }}>
      <AppBar
        position="relative"
        sx={{
          borderBottom: '1px solid grey',
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          height: '6vh',
          p: 1,
        }}
      >
        <IconButton onClick={() => dispatch(toggleDrawer())}>
          <MenuIcon />
        </IconButton>
        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', cursor: 'pointer' }}
        >
          <MonitorHeartIcon
            fontSize="large"
            sx={{ mr: 2 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.5rem',
            }}
          >
            HMD
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          {isLogged && (
            <>
              <Button
                onClick={() => dispatch(onLogout(false))}
                sx={{ mr: 2 }}
                size="small"
                color="inherit"
                variant="outlined"
              >
                Déconnexion
              </Button>
              <Avatar
                onClick={() => navigate('/profil')}
                sx={{ mr: 1, cursor: 'pointer' }}
              >
                {initial}
              </Avatar>
            </>
          )}
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {isDark ? <LightModeIcon /> : <DarkMode />}
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
}
