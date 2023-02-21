
import { Link } from 'react-router-dom';
import { Fingerprint, PersonAdd } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

import Slider from "./Slider/Slider";
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleForm } from '../../features/UI/uiSlice';

const Home = () => {
    const images = [img1, img2, img3]
    const dispatch = useAppDispatch();
    return (
        <Box sx={{my:4}}>
            <Box sx={{textAlign:"center"}}>
                <Typography sx={{fontSize:"3em"}} variant="h1" gutterBottom>
                    Health Monitoring Dashboard
                </Typography>
                <Typography sx={{mb:4}} variant="subtitle1" gutterBottom>
                La santé à portée de main : notre dashboard vous accompagne au quotidien. Alors n'hésitez plus, prenez le contrôle de votre santé et améliorez votre bien-être.
                </Typography>
            </Box>
            <Slider images={images} />
            <Box sx={{display:"flex", justifyContent:"center", m:5}}>
                <Link to={'/authentification'}>
                    <Button sx={{mx:2}} variant="contained" onClick={() => dispatch(toggleForm())}><PersonAdd />Sign up</Button>
                    <Button sx={{mx:2}} variant="contained" onClick={() => dispatch(toggleForm())}><Fingerprint />Login</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Home;
