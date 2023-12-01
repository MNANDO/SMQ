import React, { useState } from 'react';

export type TrackData = {
    trackId: string,
    trackTitle: string,
    duration: number, 
} 

export type Question = {
    answer: string,
    options: string[],
    trackId: string, 
    trackDuration: number, // duration of the track in ms
}

/**
 * Generates tracks from a user playlist 
 * @param playlistId 
 * @param quizType 
 * @param accessToken 
 * @returns Promise<TrackData[] | null
 */
const getTracksFromPlaylist = async (playlistId: string, accessToken: string): Promise<TrackData[] | null> => {
    try {
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch tracks: ${response.statusText}`);
        }

        const data = await response.json();

        const tracks: TrackData[] = data.items.map((item: any) => {
            const track = item.track;
            return {
                trackId: track.uri,
                trackTitle: track.name,
                duration: track.duration_ms
            };
        });
        return tracks;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null;
        }
    }
    return null;
}

// Function to select n random elements without repetition
const selectRandomElements = (options: any, n: number) => {
  const shuffledOptions = options.sort(() => Math.random() - 0.5); // Simple shuffle
  return shuffledOptions.slice(0, n); // Select the first 3 shuffled elements
};

export const useMusicQuiz = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ questions, setQuestions ] = useState<Question[] | null>([]);
    const [ currentQuestion, setCurrentQuestion ] = useState<Question | null>()
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ finished, setFinished ] = useState(false);

    /**
     * Generates the questions and sets the initial state
     * @param playlistId 
     * @param quizType 
     * @param accessToken 
     * @param limit 
     * @returns 0 if there were no issues generating questions or setting state | 1 if an error occured
     */
    const startQuiz = async (playlistId: string, accessToken: string, limit: number) => {
        try {
            setIsLoading(true);
            setError(null);

            const tracksFromPlaylist = await getTracksFromPlaylist(playlistId, accessToken);

            if (tracksFromPlaylist) {
                const generatedQuestions = tracksFromPlaylist.map((track) => {
                    const availableOptions = selectRandomElements(tracksFromPlaylist.filter((e) => e.trackId !== track.trackId), 3);
                    const randomIndex = Math.floor(Math.random() * (availableOptions.length + 1)); // Generate a random index
                    // Insert the 'newItem' at the random index within the 'availableOptions' array
                    availableOptions.splice(randomIndex, 0, track);
                    const options = availableOptions.map((option: TrackData) => option.trackTitle);
                    return {
                        answer: track.trackTitle as string,
                        options: options as string[],
                        trackId: track.trackId,
                        trackDuration: track.duration
                    };
                });
                const selectedQuestions = selectRandomElements(generatedQuestions, limit);
                setQuestions(selectedQuestions)
                if (selectedQuestions.length > 0) {
                    setCurrentQuestion(selectedQuestions[0]);
                }
                return 0;
            } else {
                throw new Error('Failed to fetch tracks')
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
        return 1;
    };

    /**
     * Compares the user input with the question answer and updates state
     * @param value 
     * @returns void
     */
    const nextQuestion = (value?: string) => {
        if (questions && currentQuestion && currentQuestionIndex + 1 < questions.length) {
            console.log(`input: ${value} answer: ${currentQuestion.answer}`)
            if (value && value === currentQuestion.answer) {
                setScore(score + 1);
            }
            setCurrentQuestion(questions[currentQuestionIndex + 1]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setFinished(true);
        }
    }

    return {
        isLoading,
        error,
        score,
        finished,
        currentQuestion,
        startQuiz: React.useCallback(startQuiz, []),
        nextQuestion: React.useCallback(nextQuestion, [currentQuestion, currentQuestionIndex, questions, score])
    }
}
