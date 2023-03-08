import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { selectTheme } from '../../../reducers/UI/uiSlice';
import { useAppSelector } from '../../../store/hooks';
import { themeLight } from '../../../theme/theme';

interface AddBoxProps {
  drugOption: number;
  smokeOption: number;
}

export default function AddBox({ drugOption, smokeOption }: AddBoxProps): JSX.Element {
  const navigate = useNavigate();
  const optionNull = drugOption === 0 && smokeOption === 0;
  const isDark = useAppSelector(selectTheme);
  return (
    <Box
      sx={{
        border: `1px solid ${isDark ? 'white' : themeLight.palette.primary.main}`,
        borderRadius: '5px',
        minHeight: '250px',
        display: 'flex',
        flexDirection: `${optionNull ? 'column' : ''}`,
      }}
    >
      {optionNull && (
        <>
          <Button
            onClick={() => navigate('/tabagisme')}
            sx={{ height: '50%', fontSize: '2rem' }}
          >
            tabagisme
          </Button>
          <Button
            onClick={() => navigate('/medicaments')}
            sx={{ height: '50%', fontSize: '2rem' }}
          >
            traitement médical
          </Button>
        </>
      )}
      {drugOption !== 0 && smokeOption === 0 && (
        <Button
          onClick={() => navigate('/tabagisme')}
          sx={{ fontSize: '2rem', width: '100%' }}
        >
          tabagisme
        </Button>
      )}
      {drugOption === 0 && smokeOption !== 0 && (
        <Button
          onClick={() => navigate('/medicaments')}
          sx={{ fontSize: '2rem', width: '100%' }}
        >
          traitement médical
        </Button>
      )}
    </Box>
  );
}
