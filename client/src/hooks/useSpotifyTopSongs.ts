import React, { useState } from 'react';
import { useSpotify } from '../context/SpotifyContext';

//TODO edit data to properly map values from json object to TopSongs
export interface TopSongs {
    id: string;
    totalSongs: number;
}

const getUserTopSongs = async (accessToken: string): Promise<TopSongs[] | null> => {
    try{
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.items) {
                return data.items;
            } else {
                throw new Error('Top Artists data not found');
            }
        } else {
            throw new Error('Failed to fetch Top Artists');
        }
    } catch(error) {
        console.error('failed to retrieve data');
        return null;
    }
}

export const useSpotifyTopSongs = () => {
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ data, setData ] = useState<TopSongs[] | null>(null)

    const execute = async (accessToken: string) => {
        try{
            setIsLoading(true);
            const userTopSongsData = await getUserTopSongs(accessToken);
            //TODO map Artist data to userTopSongsData

        }catch(error){
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
}