import {Button, FormControl, FormGroup, Paper, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // envoyer au backend
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }
    return (
      <Paper sx={{margin: '0 auto', width:"100%" }}>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{width:"100%", height:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <Typography variant="h1" sx={{fontSize:'3em', mb:5}}>
              Formulaire de connexion
          </Typography>
            <FormGroup>
            <TextField
              sx={{py:2}}
              label="email"
              placeholder="entrez votre email"
              variant="standard"
              type="email"
              value=""
              onChange={handleChange}
            />
              <TextField
              sx={{py:2}}
              label="password"
              variant="standard"
              type="password"
              value=""
              onChange={handleChange}
            />
            </FormGroup>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </FormControl>
        </form>
        </Paper>
      );
    }
export default LoginForm;