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
                    trackId: track.id,
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
                    trackId: track.id,
                    trackTitle: track.name,
                    duration: track.duration_ms
                };
            });
            return tracks;
        } catch (e) {}
    }
    return null;
}

export const useMusicQuiz = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ questions, setQuestions ] = useState<Question[] | null>([]);



    
}
