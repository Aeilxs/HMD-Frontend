import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ExpandMore, Info } from '@mui/icons-material';

interface MessageProps {
  title: string;
  content: string;
  width: number;
}

function MessageBox({ title, content, width }: MessageProps) {
  return (
    <Accordion sx={{ width: `${width}%` }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
      >
        <Typography
          variant="h3"
          sx={{ fontSize: '2em', p: 1, display: 'flex' }}
        >
          <Info
            fontSize="large"
            sx={{ mr: 1 }}
          />
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default MessageBox;
