import { Box, Button, Container, TextField } from "@mui/material";
import MessageBox from "../../UI/MessageBox/MessageBox";

export default function DrugPage(): JSX.Element {
  return (
    <Container>
      <MessageBox title="En savoir plus" content="lorem lorem lorem lorem lorem lorem lorem" width={100}/>
      <Box sx={{display:'flex', flexDirection:'column', width: '50%', mx: 'auto', my:2}}>
        <TextField label="Quel medicament prenez-vous ?" variant="standard" sx={{py:3}}/>
        <TextField label="Dose" variant="standard" sx={{py:3}}/>
        <TextField label="Informations complementaires" variant="standard" sx={{py:3}}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2em' }}>
          <Button variant="contained">Envoyer</Button>
        </Box>
      </Box>
    </Container>
  );
}
