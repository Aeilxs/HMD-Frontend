import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { toggleForm } from '../../features/UI/uiSlice';

interface AuthFormProps {
    text: string;
    buttonText: string;
    }

function AuthToggleMessage({ text, buttonText } : AuthFormProps) {
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ textAlign: 'center', padding: '1.5em' }}>
      <Typography variant="h1" sx={{ fontSize: '3em', mb: 5 }}>
        {text}
      </Typography>
      <Button
        sx={{ backgroundColor: '#f79829', '&:hover': { backgroundColor: '#dd7a08' } }}
        variant="contained"
        onClick={() => dispatch(toggleForm())}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default AuthToggleMessage;