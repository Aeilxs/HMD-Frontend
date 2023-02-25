import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton } from '@mui/material';

interface FooterIconProps {
  name: string;
  link: string;
}

export default function FooterIcon({ name, link }: FooterIconProps): JSX.Element {
  return (
    <IconButton onClick={() => window.open(link)}>
      {name === 'facebook' && <FacebookIcon fontSize="large" />}
      {name === 'github' && <GitHubIcon fontSize="large" />}
      {name === 'linkedin' && <LinkedInIcon fontSize="large" />}
    </IconButton>
  );
}
