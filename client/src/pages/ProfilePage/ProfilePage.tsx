import React, { useEffect } from "react"
import ProfileNavigation from '../../components/ProfileNavigation';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useSpotify } from '../../context/SpotifyContext';
import { useNavigate } from 'react-router-dom';
import { useSpotifyTopArtists} from '../../hooks/useSpotifyTopArtists'
import { useSpotifyTopSongs } from "../../hooks/useSpotifyTopSongs";
import { fontSize } from "@mui/system";


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
  const artistImg1 = topArtists.data?.[0]?.images?.[0].url ?? 'empty';
  const artistImg2 = topArtists.data?.[1]?.images?.[0].url ?? 'empty';
  const artistImg3 = topArtists.data?.[2]?.images?.[0].url ?? 'empty';
  const artistImg4 = topArtists.data?.[3]?.images?.[0].url ?? 'empty';
  const container1Items = [artist1, artist2, artist3, artist4];
  const container1ImgsItems = [artistImg1, artistImg2, artistImg3, artistImg4];

  useEffect(()=>{
    try{
      topSongs.execute(accessToken as string);
    } catch(e) {}
  }, [topSongs.execute]);

  const song1 = topSongs.data?.[0]?.name ?? 'No top song available';
  const song2 = topSongs.data?.[1]?.name ?? 'No top song available';
  const song3 = topSongs.data?.[2]?.name ?? 'No top song available';
  const song4 = topSongs.data?.[3]?.name ?? 'No top song available';
  const songImg1 = topSongs.data?.[0]?.images?.[0].url ?? 'empty';
  const songImg2 = topSongs.data?.[1]?.images?.[0].url ?? 'empty';
  const songImg3 = topSongs.data?.[2]?.images?.[0].url ?? 'empty';
  const songImg4 = topSongs.data?.[3]?.images?.[0].url ?? 'empty';
  const container2Items = [song1, song2, song3, song4];
  const container2ImgsItems = [songImg1, songImg2, songImg3, songImg4];

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#121212', // Dark grey or black color
    color: '#f2f2f2', // Text color (white in this case)
    padding: '10px', // Adjust padding as needed
    margin: '40px', // Adjust margin as needed
  };


  const divStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '100px', // Adjust the gap between columns
    rowGap: '2px', 
  };

  const itemStyle: React.CSSProperties = {
    padding: '5px',
    textAlign: 'center',
    margin: '5px', // Adjust the margin as needed
  };

  const itemStyle2: React.CSSProperties = {
    padding: '5px',
    textAlign: 'center',
    margin: '2px',
    color: '#1DB954',
    fontSize: '50px',
  }

    return (
        <div>
        <ProfileNavigation/>

       
        <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      color="#f2f2f2"
      flexDirection="column"  
      p={3}
        >


        <h1 style={{ marginRight: '75%' }}> Your Profile</h1>
        <div id='scores' style={divStyle}>
          <h3 style={itemStyle}>Your Best score</h3>
          <h3 style={itemStyle}>Most Recent score</h3>
          <h2 style={itemStyle2}>100%</h2>
          <h2 style={itemStyle2}>100%</h2>
          <h5 style={itemStyle}>playlist name</h5>
          <h5 style={itemStyle}>playlist name</h5>
        </div>
        <Grid container spacing={2}>
        {/* First Container */}
        <Grid item xs={12} md={6}>
          <Paper style={containerStyle}>
            <Typography variant="h4" style={{ textAlign: 'center'}}>Top Artists</Typography>
            <ul style={{ listStyleType: 'none', padding: 30}}>
              
              {container1Items.map((item, index) => (
                 <li key={index} style={{ marginBottom: '20px'}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={container1ImgsItems[index]} style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '20px',  marginLeft: '40px'}}></img>  
                      <span>{item}</span>
                    </div>
                 </li>
                ))}

              </ul>
          </Paper>
        </Grid>
  
        {/* Second Container */}
        <Grid item xs={12} md={6}>
          <Paper style={containerStyle}>
            <Typography variant="h4" style={{ textAlign: 'center'}}>Top Songs</Typography>
            <ul style={{ listStyleType: 'none', padding: 30}}>
            {container2Items.map((item, index) => (
                <li key={index} style={{ marginBottom: '20px'}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     <img src={container2ImgsItems[index]} style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '20px', marginLeft: '40px'}}></img>
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