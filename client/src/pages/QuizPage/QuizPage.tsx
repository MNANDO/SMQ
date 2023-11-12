import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSpotify } from '../../context/SpotifyContext';
import PlaybackButton from '../../components/PlaybackButton';
import { Grid, Button, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import SpotifyPlayer from '../../features/SpotifyPlayer'

import { Question, useMusicQuizQuestions } from '../../hooks/useMusicQuiz'

interface QuizData {
  totalQuestions: number;
  timeLimit: number;
  type: string;
  playlist: string;
}


const QuizPage = () => {
    const { accessToken } = useSpotify();
    // quiz mechnics 
    const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);
    const [ score, setScore ] = useState<number>(0);
    const [ answer, setAnswer ] = useState<string>('');
    const [deviceId, setDeviceId] = useState<string>('');
    const [ duration, setDuration ] = useState<number>(5000);

    const quizQuestions = useMusicQuizQuestions();
    const { quizData } = useParams();
    const data = JSON.parse(quizData as string);

    const spotifyPlayer = new SpotifyPlayer(accessToken as string, deviceId);

    useEffect(() => { // Connect to spotify and initialize the device ID
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Spotify Music Quiz',
                getOAuthToken: cb => { cb(accessToken as string); },
                volume: 0.5
            });

            player.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                setDeviceId(device_id);
            });

            player.connect();
        };
        
    }, []);

    useEffect(() => { // load the quiz questions 
        quizQuestions.generateQuestions(data.playlist, data.type, accessToken as string, data.totalQuestions);
    }, [quizQuestions.generateQuestions]);

    const nextQuestion = (e: any) => {
        if (quizQuestions.questions && currentQuestion < quizQuestions.questions?.length) {
            // check the answer and update scoreboard
            if (e.target.value == quizQuestions.questions[currentQuestion].answer) {
                setScore((prev) => prev + 1);
            }
            // quizQuestions.questions[currentQuestion].answer
            setCurrentQuestion((prev) => prev + 1);
        } else if (quizQuestions.questions && currentQuestion >= quizQuestions.questions?.length) {
            // logic for finishing the quiz is here 
            console.log('end of quiz');
        }
    }

    return (
        <>
            { quizQuestions.isLoading && <LoadingScreen />}
            {
              !quizQuestions.isLoading &&
              quizQuestions &&
              quizQuestions.questions &&
              quizQuestions.questions.length > 0 &&  
              currentQuestion < quizQuestions.questions.length &&
              quizQuestions.questions[currentQuestion] && (
                <div>
                    <div>
                        <Typography variant='h6' sx={{ margin: '20px'}}><strong>Question: {currentQuestion + 1}</strong></Typography>
                        <Typography variant='h6' sx={{ margin: '20px'}}><strong>Score: {score}</strong></Typography>
                    </div>
                  
                  <Grid container justifyContent={'center'}>
                      <PlaybackButton 
                          deviceId={deviceId} 
                          trackUri={quizQuestions.questions[currentQuestion].trackId} 
                          duration={duration}
                          position={Math.floor(Math.random() * (quizQuestions.questions[currentQuestion].trackDuration) - duration) - 5000}
                      />
                  </Grid>
                  <Grid container spacing={1} justifyContent="center" sx={{ maxWidth: '500px', margin: '0 auto' }}>
                    {quizQuestions.questions[currentQuestion].options.map((option) => (
                        <Grid item xs={6}>
                            <Button variant='contained' 
                                sx={{height: '200px'}} 
                                value={option}
                                fullWidth 
                                onClick={nextQuestion}>
                                <strong>{option}</strong>
                            </Button>
                        </Grid>
                    ))}
                  </Grid>
                </div>
              )
            }
            
        </>
    );
}

export default QuizPage;
