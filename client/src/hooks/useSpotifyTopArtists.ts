import React, { useState } from 'react';
import { TopArtists, spotifyUserTopArtistData } from 'util/SpotifyData';

export const useSpotifyTopArtists = () => {
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ data, setData ] = useState<TopArtists[] | null>(null)

    const execute = async (accessToken: string) => {
        try{
            setIsLoading(true);
            const userTopArtistsData = await spotifyUserTopArtistData(accessToken);
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