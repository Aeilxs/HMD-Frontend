import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ExpandMore, Info } from '@mui/icons-material';

interface MessageProps {
  title: string;
  content: string;
}

function MessageBox({ title, content }: MessageProps) {
  return (
    <Accordion sx={{ width: '100%', mb: 4, my: 2 }}>
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
        <Typography sx={{ textAlign: 'justify', p: 1 }}>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default MessageBox;
