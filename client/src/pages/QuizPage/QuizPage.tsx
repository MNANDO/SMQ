import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSpotify } from '../../context/SpotifyContext';
import PlaybackButton from '../../components/PlaybackButton';
import { Grid, Button } from '@mui/material';
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
    const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);
    const [ answer, setAnswer ] = useState<string>('');
    const [deviceId, setDeviceId] = useState<string>('');

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

    const nextQuestion = () => {
        setCurrentQuestion((prev) => prev + 1);
    }

    return (
        <>
            {quizQuestions.isLoading ? <LoadingScreen /> : ''}
            {
              quizQuestions &&
              quizQuestions.questions &&
              quizQuestions.questions.length > 0 &&  
              currentQuestion < quizQuestions.questions.length &&
              quizQuestions.questions[currentQuestion] && (
                <div>
                  <p>Answer: {quizQuestions.questions[currentQuestion].answer}</p>
                  <p>Options: {quizQuestions.questions[currentQuestion].options.join(', ')}</p>
                  <p>Track ID: {quizQuestions.questions[currentQuestion].trackId}</p>
                  <PlaybackButton deviceId={deviceId} trackUri={quizQuestions.questions[currentQuestion].trackId} />
                </div>
              )
            }
            <button onClick={() => {
                console.log(quizQuestions.questions);
            }}>test</button> 
            <button onClick={nextQuestion}>Next</button>
        </>
    );
}

export default QuizPage;
