import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { setFirstname, setLastname, setEmail, setPassword, setGender } from "../../../features/registration/registrationSlice";

const RegistrationForm = () =>  {
  const dispatch = useAppDispatch();
  const firstname = useAppSelector(state => state.registration.firstname);
  const lastname = useAppSelector(state => state.registration.lastname);
  const email = useAppSelector(state => state.registration.email);
  const password = useAppSelector(state => state.registration.password);
  const gender = useAppSelector(state => state.registration.gender);

  const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstname(event.target.value));
  };
  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastname(event.target.value));
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value === "Femme" || event.target.value === "Homme")
      dispatch(setGender(event.target.value))
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  };
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
              value={firstname}
              onChange={handleFirstnameChange}
            />
              <TextField
              sx={{py:2}}
              label="lastname"
              placeholder="entrez votre nom"
              variant="standard"
              type="text"
              value={lastname}
              onChange={handleLastnameChange}
            />
            <TextField
              sx={{py:2}}
              label="email"
              placeholder="entrez votre email"
              variant="standard"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              sx={{py:2}}
              label="password"
              placeholder=""
              variant="standard"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign:"start"}}>Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={gender}
              onChange={handleGenderChange}
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