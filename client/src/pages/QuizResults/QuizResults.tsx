/* QuizResults.tsx */
import { Button, Container, Typography, Box,Grid } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  buttonStyles,
  containerStyles,
  scoreStyle,
  songTitle,
} from './QuizResultsStyles'; // Import the styles from TypeScript file

const QuizResults: React.FC  = () => {  
	const { resultData } = useParams();
    console.log(resultData)
	const { quizScore, user, correct, wrong } = JSON.parse(resultData as string);

    return (
        <Container sx={containerStyles}>
            <Box>
                <Typography mb={5} variant="h2"  component="h2"><strong>You Scored</strong></Typography>
                <Typography style={scoreStyle} mb={5} variant="h1">{quizScore}%</Typography>

                <Grid container spacing={4} justifyContent="center">    
                    <Grid item xs={4}>
                        <Typography mb={5} variant='h4'><strong>Wrong</strong></Typography>
                        <div style={{ whiteSpace: "nowrap"}}>
                        <Box mb={5} component={"div"} sx={{overflow: "auto", height:"25vh", flexDirection:"column",display:"flex"}}>
                        {wrong.map((WRONG: string)=>(
                            <Typography mb={1} style={songTitle}>{WRONG}</Typography>
                        ))}
                        </Box>
                        </div>
                    </Grid>  
                    <Grid item xs={4}>
                        <Typography mb={5} variant='h4'><strong>Right</strong></Typography>
                        <Box mb={5} component={"div"} sx={{overflow:"auto", height:"25vh", flexDirection:"column",display:"flex"}}>
                        {correct.map((RIGHT: string)=>(
                            <Typography mb={1} style={songTitle}>{RIGHT}</Typography>
                        ))}
                        </Box>
                    </Grid>              
                </Grid>
                
                <Link to={'/'}><Button variant="contained" size="large"><strong>Finish</strong></Button></Link>
                <Button style={buttonStyles} variant="contained" size="large"><strong>Share</strong></Button>
            
            
            </Box>
        </Container>
        
    );
}

export default QuizResults;