import React, { useState } from 'react';

export interface Playlist {
    id: string;
    name: string;
    totalTracks: number;
}

const getUserPlaylistsData = async (accessToken: string): Promise<Playlist[] | null> => {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.items) {
                return data.items;
            } else {
                throw new Error('Playlist data not found');
            }
        } else {
            throw new Error('Failed to fetch playlists');
        }
    } catch (error) {
        console.error('failed to retrieve data');
        return null;
    }
}

export const useSpotifyUserPlaylists = () => {
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ data, setData ] = useState<Playlist[] | null>(null)

    const execute = async (accessToken: string) => {
        try {
            setIsLoading(true);
            const userPlaylistsData = await getUserPlaylistsData(accessToken);
            if (userPlaylistsData) {
                const mappedData = userPlaylistsData.map((playlist: any) => ({
                    id: playlist.id,
                    name: playlist.name,
                    totalTracks: playlist.tracks.total
                }));
                setData(mappedData);
            }
            return userPlaylistsData;
        } catch (error) {
            if (error instanceof Error) { setError(error.message) };
            setIsLoading(false);
            throw error;
        }
    }

    return {
        isLoading,
        error,
        data,
        execute: React.useCallback(execute, []),
    };
};
