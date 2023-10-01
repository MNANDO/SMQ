/* LandingPage.tsx */
import { Button, Container, Typography, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  containerStyles,
  linkContainerStyles,
  linkStyles,
} from './LandingPageStyles'; // Import the styles from TypeScript file

const LandingPage: React.FC  = () => {
    return (
        <Container sx={containerStyles}>
            <Box
                sx={linkContainerStyles}>
                <Link to="" style={linkStyles}>
                    <Typography variant="inherit" color='secondary'>
                        <strong>Login</strong>
                    </Typography>
                </Link>
                <Button variant="contained" color='secondary'><strong>Sign up</strong></Button>
            </Box>
            <Box>
                <Typography mb={2} variant="h2"  component="h2"><strong>Spotify Music Quiz</strong></Typography>
                <Typography mb={2} variant="h6">See how well you know your favorite music</Typography>
                <Button variant="contained" size="large"><strong>Get Started</strong></Button>
            </Box>
        </Container>
    );
}

export default LandingPage;
