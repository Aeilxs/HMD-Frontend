import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

interface IndicatorProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const IndicatorBox = ({ name, icon, color, link }: IndicatorProps) => {
  return (
    <Link
      to={link}
      style={{ textDecoration: 'none' }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          height: '120px',
          width: ['80vw', '200px'],
          backgroundColor: color,
          color: 'white',
          boxSizing: 'border-box',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        {icon}
        {name}
        <Box sx={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <EditIcon />
        </Box>
      </Box>
    </Link>
  );
};

export default IndicatorBox;
