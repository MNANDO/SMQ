import React, { useEffect } from "react"
import ProfileNavigation from '../../components/ProfileNavigation';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useSpotify } from '../../context/SpotifyContext';
import { useNavigate } from 'react-router-dom';
import {TopArtists, useSpotifyTopArtists} from '../../hooks/useSpotifyTopArtists'
import { useSpotifyTopSongs } from "../../hooks/useSpotifyTopSongs";


const ProfilePage: React.FC = ()=>{
  const navigate = useNavigate();
  const topArtists = useSpotifyTopArtists();
  const topSongs = useSpotifyTopSongs();
  const { accessToken } = useSpotify();

  useEffect(() =>{
    try{
        topArtists.execute(accessToken as string);
    } catch(e) {}
  }, [topArtists.execute]);

  const artist1 = topArtists.data?.[0]?.name ?? 'No top artist available';
  const artist2 = topArtists.data?.[1]?.name ?? 'No top artist available';
  const artist3 = topArtists.data?.[2]?.name ?? 'No top artist available';
  const artist4 = topArtists.data?.[3]?.name ?? 'No top artist available';
  const container1Items = [artist1, artist2, artist3, artist4];

  useEffect(()=>{
    try{
      topSongs.execute(accessToken as string);
    } catch(e) {}
  }, [topSongs.execute]);

  const song1 = topSongs.data?.[0]?.name ?? 'No top song available';
  const song2 = topSongs.data?.[1]?.name ?? 'No top song available';
  const song3 = topSongs.data?.[2]?.name ?? 'No top song available';
  const song4 = topSongs.data?.[3]?.name ?? 'No top song available';
  const container2Items = [song1, song2, song3, song4];

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
            <Typography variant="h6" style={{ textAlign: 'center'}}>Top Artists</Typography>
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
            <Typography variant="h6" style={{ textAlign: 'center'}}>Top Songs</Typography>
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