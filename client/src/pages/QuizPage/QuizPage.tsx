import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSpotify } from '../../context/SpotifyContext';
import PlaybackButton from '../../components/PlaybackButton';
import { Grid, Button, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import Timer from '../../components/Timer';

import { useMusicQuiz } from '../../hooks/useMusicQuiz';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
	const { accessToken, user } = useSpotify();
	const [deviceId, setDeviceId] = useState<string>('');

	const [timeLimit, setTimeLimit] = useState<number>(10000); // time limit in ms

	const { totalQuestions, correct, wrong, isLoading, error, score, finished, currentQuestion, startQuiz, nextQuestion } = useMusicQuiz();

	const { quizData } = useParams();
	const data = JSON.parse(quizData as string);

	const navigate = useNavigate();

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
		// load the quiz questions and initialize the current question and set time limit
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
		if (deviceId) {
			startMusicQuiz();
			setTimeLimit(data.timeLimit * 1000)
		}

	}, [startQuiz, deviceId, accessToken]);

	useEffect(() => {
		if (finished) {
			// redirect to results page
			let finalScore = 0;
			if (totalQuestions && totalQuestions > 0) {
				finalScore = Math.floor((correct.length / totalQuestions) * 100);
			}
			const resultData = {
				user: user?.displayName || '',
				quizScore: finalScore,
				correct: correct,
				wrong: wrong,
			}
			
			const encodedResultData = encodeURIComponent(JSON.stringify(resultData));
			// Navigate to the results page with the final score, correct, and wrong values
			navigate(`/QuizResults/${encodedResultData}`);
		}
	}, [finished, totalQuestions, correct, wrong, navigate, user?.displayName]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selectedValue = event.currentTarget.value; // Use currentTarget instead of target

        if (selectedValue !== undefined) {
            nextQuestion(selectedValue);
        } else {
            // Handle the case where value is undefined (optional)
            console.error("Button value is undefined");
        }
    };

    const colors = ['#E577FF', '#FFE765', '#FF7777', '#71A7FF'];

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
                    <div style={{textAlign: 'center'}}>
                        <Timer nextQuestion={nextQuestion} timeLimit={timeLimit} currentQuestion={currentQuestion} loading={isLoading} />
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
						{currentQuestion.options ?
                        currentQuestion.options.map((option, index) => (
							<Grid item key={index} xs={6}>
								<Button
									variant="contained"
                                    sx={{
                                    height: '200px',
                                    backgroundColor: colors[index % colors.length], // Use modulo to cycle through colors
                                    color: 'black',
                                    transition: 'background-color 0.3s ease', // Add smooth transition
                                    '&:hover': {
                                        backgroundColor: `${colors[index % colors.length]}80`, // Add alpha for a darker effect
                                    },
                                    }}
									value={option}
									fullWidth
									onClick={handleClick}
								>
									<strong>{option}</strong>
								</Button>
							</Grid>
						)) : (
                            <Typography variant="body1">Loading options...</Typography>
                        )}
					</Grid>
				</div>
			)}
		</>
	);
};

export default QuizPage;
