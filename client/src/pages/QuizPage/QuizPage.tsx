import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSpotify } from '../../context/SpotifyContext';
import PlaybackButton from '../../components/PlaybackButton';
import { Grid, Button, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';

import { useMusicQuiz } from '../../hooks/useMusicQuiz';

const QuizPage = () => {
	const { accessToken } = useSpotify();
	const [deviceId, setDeviceId] = useState<string>('');

	const [timeLimit, setTimeLimit] = useState<number>(0); // time limit in ms

	const { isLoading, error, score, finished, currentQuestion, startQuiz, nextQuestion } = useMusicQuiz();

	const { quizData } = useParams();
	const data = JSON.parse(quizData as string);

	useEffect(() => {
		// Connect to spotify and initialize the device ID
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;
		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Spotify Music Quiz',
				getOAuthToken: (cb) => {
					cb(accessToken as string);
				},
				volume: 0.5,
			});

			player.addListener('ready', ({ device_id }) => {
				setDeviceId(device_id);
			});

			player.addListener('not_ready', ({ device_id }) => {
				setDeviceId(device_id);
			});

			player.connect();
		};
	}, [accessToken]);

	useEffect(() => {
		// load the quiz questions and initialize the current question
		console.log(deviceId);

		const startMusicQuiz = async () => {
			try {
				const status = await startQuiz(
					data.playlist,
					accessToken as string,
					data.totalQuestions
				);
                if (status === 1) {
                    throw new Error('Failed to start the quiz');
                }
			} catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
            }
		};
		startMusicQuiz();
	}, [startQuiz, deviceId, accessToken]);

    useEffect(() => {
        if (finished) {
            // redirect to results page
            console.log('finished')
        }
    }, [finished])

    const handleClick = (event: any) => {
        nextQuestion(event.target.value);
    }

	return (
		<>
			{isLoading || error || // change error to its own page
			!currentQuestion ||
			deviceId === '' ? (
				<LoadingScreen />
			) : (
				<div>
					<div>
						<Typography variant="h6" sx={{ margin: '20px' }}>
							<strong>Score: {score}</strong>
						</Typography>
					</div>
                
					<Grid container justifyContent={'center'}>
						<PlaybackButton
							deviceId={deviceId}
							trackUri={currentQuestion.trackId}
							position={
								Math.floor(
									Math.random() *
										currentQuestion.trackDuration -
										5000
								) - 5000
							}
						/>
					</Grid>
					<Grid
						container
						spacing={1}
						justifyContent="center"
						sx={{ maxWidth: '500px', margin: '0 auto' }}
					>
						{currentQuestion.options.map((option, index) => (
							<Grid item key={index} xs={6}>
								<Button
									variant="contained"
									sx={{ height: '200px' }}
									value={option}
									fullWidth
									onClick={handleClick}
								>
									<strong>{option}</strong>
								</Button>
							</Grid>
						))}
					</Grid>
				</div>
			)}
		</>
	);
};

export default QuizPage;
