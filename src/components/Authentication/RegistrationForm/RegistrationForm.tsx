import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const RegistrationForm = () =>  {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }
  return (
    <Paper sx={{margin: '0 auto', width:"100%" }}>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{width:"100%", height:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <Typography variant="h1" sx={{fontSize:'3em', mb:5}}>
            Formulaire d'inscription
        </Typography>
          <FormGroup>
            <TextField
              sx={{py:2}}
              label="firstname"
              placeholder="entrez votre prénom"
              variant="standard"
              type="text"
              value="Test"
              onChange={handleChange}
            />
              <TextField
              sx={{py:2}}
              label="lastname"
              placeholder="entrez votre nom"
              variant="standard"
              type="text"
              value="Nom"
              onChange={handleChange}
            />
            <TextField
              sx={{py:2}}
              label="email"
              placeholder="entrez votre email"
              variant="standard"
              type="email"
              value="test@oclock.io"
              onChange={handleChange}
            />
            <TextField
              sx={{py:2}}
              label="password"
              placeholder=""
              variant="standard"
              type="password"
              value=""
              onChange={handleChange}
            />
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign:"start"}}>Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value="Femme"
              onChange={handleChange}
              name="radio-buttons-group"
            >
              <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
              <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
            </RadioGroup>
            </FormControl>
          </FormGroup>
          <Button sx={{mt:3}} type="submit" variant="contained" endIcon={<SendIcon />}>
            Submit
          </Button>
        </FormControl>
      </form>
      </Paper>
    );
    }
export default RegistrationForm;