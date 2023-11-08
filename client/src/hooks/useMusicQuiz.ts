import React, { useState } from 'react';

export type TrackData = {
    trackId: string,
    artist?: string,
    trackTitle?: string,
    duration: number, // duration of the track in ms
} & ({ artist: string } | { trackTitle: string })

export type Question = {
    answer: string,
    options: string[],
    trackId: string, 
}

const getTracksFromPlaylist = async (playlistId: string, quizType: 'artist' | 'title', accessToken: string): Promise<TrackData[] | null> => {
    if (quizType === 'artist') {
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
                    artist: track.artists.map((artist: any) => artist.name).join(', '),
                    duration: track.duration_ms
                };
            });

            // add recommended tracks 
            return tracks;
        } catch (e) {}
    }
    else if (quizType == 'title') {
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
        } catch (e) {}
    }
    return null;
}

// Function to select n random elements without repetition
const selectRandomElements = (options: any, n: number) => {
  const shuffledOptions = options.sort(() => Math.random() - 0.5); // Simple shuffle
  return shuffledOptions.slice(0, n); // Select the first 3 shuffled elements
};

export const useMusicQuizQuestions = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ questions, setQuestions ] = useState<Question[] | null>([]);

    const generateQuestions = async (playlistId: string, quizType: 'artist' | 'title', accessToken: string, limit: number) => {
        try {
            setIsLoading(true);
            setError(null);

            const tracksFromPlaylist = await getTracksFromPlaylist(playlistId, quizType, accessToken);

            if (tracksFromPlaylist) {
                const generatedQuestions = tracksFromPlaylist.map((track) => {
                    const availableOptions = selectRandomElements(tracksFromPlaylist.filter((e) => e.trackId !== track.trackId), 3);
                    const randomIndex = Math.floor(Math.random() * (availableOptions.length + 1)); // Generate a random index
                    // Insert the 'newItem' at the random index within the 'availableOptions' array
                    availableOptions.splice(randomIndex, 0, track);
                    const options = availableOptions.map((option: TrackData) => option.artist ? option.artist : option.trackTitle);

                    return {
                        answer: track.artist ?? track.trackTitle as string,
                        options: options as string[],
                        trackId: track.trackId,
                    };
                });
                setQuestions(selectRandomElements(generatedQuestions, limit))
            } else {
                setError('Failed to fetch tracks');
            }
        } catch (e) {
            setError('Failed to generate questions');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        questions,
        generateQuestions: React.useCallback(generateQuestions, []),
    }
}
