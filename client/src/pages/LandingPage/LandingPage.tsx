/* LandingPage.tsx */
import { Button, Container, Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';

import {
    pageStyles,
    containerStyles,
    linkContainerStyles
} from './LandingPageStyles'; // Import the styles from TypeScript file

import { useSpotify } from '../../context/SpotifyContext';

const LandingPage: React.FC  = () => {
    const { login } = useSpotify();
    const handleLogin = () => {
        login();
    }

    useEffect(() => {
        
    }, []);

    return (
        <div style={pageStyles}>
            <Container sx={containerStyles}>
                <Box
                sx={linkContainerStyles}>
                    <Button variant="contained" color='secondary' onClick={handleLogin}><strong>Login to Spotify</strong></Button>
                </Box>
                <Box>
                    <Typography mb={2} variant="h2"><strong>Spotify Music Quiz</strong></Typography>
                    <Typography mb={2} variant="h6">See how well you know your favorite music</Typography>
                    <Button variant="contained" size="large"><strong>Get Started</strong></Button>
                </Box>
            </Container>
        </div>
    );
}

export default LandingPage;
