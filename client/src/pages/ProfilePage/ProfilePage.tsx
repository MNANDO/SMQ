import React from "react"
import ProfileNavigation from '../../components/ProfileNavigation';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useSpotify } from '../../context/SpotifyContext';
import { useNavigate } from 'react-router-dom';



const ProfilePage = ()=>{
  const navigate = useNavigate();
  const container1Items = ['Artist 1', 'Artist 2', 'Artist 3', 'Artist 4'];
  const container2Items = ['Song 1', 'Song 2', 'Song 3', 'Song 4'];

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#121212', // Dark grey or black color
    color: '#f2f2f2', // Text color (white in this case)
    padding: '20px', // Adjust padding as needed
    margin: '40px', // Adjust margin as needed
  };

    return (
        <div>
        <ProfileNavigation/>

       
        <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
      color="#f2f2f2"
      flexDirection="column"  
        >

        <h1 style={{ marginRight: '75%' }}> Your Profile</h1>
        <Grid container spacing={2}>
        {/* First Container */}
        <Grid item xs={6}>
          <Paper style={containerStyle}>
            <Typography variant="h6" style={{ textAlign: 'center'}}>Top Songs</Typography>
            <ul style={{ listStyleType: 'none', padding: 30}}>
              {container1Items.map((item, index) => (
                 <li key={index} style={{ marginBottom: '8px'}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                     <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#4CAF50', marginRight: '10px' }}></div>
                      <span>{item}</span>
                    </div>
                 </li>
                ))}
              </ul>
          </Paper>
        </Grid>
  
        {/* Second Container */}
        <Grid item xs={6}>
          <Paper style={containerStyle}>
            <Typography variant="h6" style={{ textAlign: 'center'}}>Top Artists</Typography>
            <ul style={{ listStyleType: 'none', padding: 30}}>
            {container2Items.map((item, index) => (
                <li key={index} style={{ marginBottom: '8px'}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#4CAF50', marginRight: '10px' }}></div>
                    <span>{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </div>
    )
}
export default ProfilePage