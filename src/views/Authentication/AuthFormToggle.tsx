import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectForm, toggleForm } from '../../reducers/UI/uiSlice';

import { Typography, Button, Container } from '@mui/material';

interface AuthFormToggleProps {
  text: string;
  buttonText: string;
}
function AuthFormToggle({ text, buttonText }: AuthFormToggleProps) {
  const dispatch = useAppDispatch();
  const isRegistered = useAppSelector(selectForm);
  return (
    <Container
      sx={{
        backgroundColor: '#7bc1b7',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: '3em', mb: 5 }}
      >
        {text}
      </Typography>
      <Button
        sx={{ backgroundColor: '#f79829', '&:hover': { backgroundColor: '#dd7a08' } }}
        variant="contained"
        onClick={() => dispatch(toggleForm(!isRegistered))}
      >
        {buttonText}
      </Button>
    </Container>
  );
}

export default AuthFormToggle;
