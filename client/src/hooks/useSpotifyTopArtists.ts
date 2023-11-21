import React, { useState } from 'react';
import { useSpotify } from '../context/SpotifyContext';

interface Image {
    url: string;
    width: number;
    height: number;
  }

//TODO edit data to properly map values from json object to TopArtists
export interface TopArtists {
    id: string;
    name: string;
    images?: Image[];
}

const getUserTopArtists = async (accessToken: string): Promise<TopArtists[] | null> => {
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

export const useSpotifyTopArtists = () => {
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ data, setData ] = useState<TopArtists[] | null>(null)

    const execute = async (accessToken: string) => {
        try{
            setIsLoading(true);
            const userTopArtistsData = await getUserTopArtists(accessToken);
            //TODO map Artist data to userTopArtistsData
            if(userTopArtistsData){
                const mappedData = userTopArtistsData.map((artist: any) => ({
                    id: artist.id,
                    name: artist.name,
                    images: artist.images
                }));
                setData(mappedData);
            }
            return userTopArtistsData;
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