import React, { useState } from 'react';

import { TrackData, spotifyPlaylistTrackData } from 'util/SpotifyData';

export type Question = {
    answer: string,
    options: string[],
    trackId: string, 
    trackDuration: number, // duration of the track in ms
}

/**
 * Function to select n random elements without repetition
 * @param options 
 * @param n 
 * @returns 
 */
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
    const [ correct, setCorrect ] = useState<string[]>([]);
    const [ wrong, setWrong ] = useState<string[]>([]);
    const [ totalQuestions, setTotalQuestions ] = useState<number>();
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

            const tracksFromPlaylist = await spotifyPlaylistTrackData(playlistId, accessToken);

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
                    setTotalQuestions(selectedQuestions.length);
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
        console.log('next')
        if (questions && !(currentQuestionIndex + 1 < questions.length)) {
            setFinished(true);
        } else if (questions && currentQuestion) {
            console.log(`input: ${value} answer: ${currentQuestion.answer}`)
            if (value) {
                if (value === currentQuestion.answer) {
                    setScore(score + 1);
                    console.log('correct')
                    setCorrect((prev) => [...prev, value])
                } else {
                    setWrong((prev) => [...prev, value]);
                }
            }
            setCurrentQuestion(questions[currentQuestionIndex + 1]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } 
    }

    return {
        isLoading,
        error,
        score,
        finished,
        currentQuestion,
        correct,
        wrong,
        totalQuestions,
        startQuiz: React.useCallback(startQuiz, []),
        nextQuestion: React.useCallback(nextQuestion, [currentQuestion, currentQuestionIndex, questions, score])
    }
}
