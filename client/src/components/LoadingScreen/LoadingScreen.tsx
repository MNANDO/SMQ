import React from 'react'

import { Typography, Container, CircularProgress } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  loadingText: {
    padding: 20,
    borderRadius: 5,
  },
};

const LoadingScreen = () => {
  return (
    <Container sx={styles.container}>
      <div style={styles.loadingText}>
        <Typography textAlign='center' variant="h2" color={'primary'}><strong>Loading Quiz</strong></Typography>
      </div>
        <CircularProgress color="primary" />
    </Container>
  );
}

export default LoadingScreen;
