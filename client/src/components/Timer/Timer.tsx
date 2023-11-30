import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import { Question } from '../../hooks/useMusicQuiz';

const Timer = ({
	timeLimit,
	currentQuestion,
	loading,
    nextQuestion,
}: {
	timeLimit: number;
	currentQuestion: Question;
	loading: boolean;
    nextQuestion: () => void;
}) => {
	const [timer, setTimer] = useState<number>(timeLimit);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		// Start the timer when a new question is set
		if (currentQuestion) {
			setTimer(timeLimit);

			// Decrement the timer every second
			intervalId = setInterval(() => {
				setTimer((prevTimer) => {
					const newTimer = prevTimer - 1000;

					if (newTimer <= 0) {
						console.log('End of question');
						clearInterval(intervalId);
						return 0; // Ensure the timer doesn't go below 0
					} else if (!loading) {
						return newTimer;
					} else {
						return prevTimer; // Don't decrement if loading
					}
				});
			}, 1000);
		}

		// Clear the interval and reset the timer on component unmount or when a new question is set
		return () => {
			clearInterval(intervalId);
			setTimer(0);
		};
	}, [currentQuestion, timeLimit]);

    useEffect(() => {
        if (timer === 0) {
          nextQuestion();
        }
      }, [timer, nextQuestion]);

	return (
		<Typography variant="h2" sx={{ margin: '20px' }}>
			<strong>{timer/1000}</strong>
		</Typography>
	);
};

export default Timer;
