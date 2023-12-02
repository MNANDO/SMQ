import React, { useState } from 'react';

import { TopSongs, spotifyUserTopSongData } from 'util/SpotifyData';

export const useSpotifyTopSongs = () => {
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ data, setData ] = useState<TopSongs[] | null>(null)

    const execute = async (accessToken: string) => {
        try{
            setIsLoading(true);
            const userTopSongsData = await spotifyUserTopSongData(accessToken);
            //TODO map Artist data to userTopSongsData
            if(userTopSongsData){
                const mappedData = userTopSongsData.map((track: any) => ({
                    id: track.id,
                    name: track.name,
                    images: track.album.images
                }));
                setData(mappedData);
            }
            return userTopSongsData;
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