import { useState } from "react";
import SpotifyPlayer from "../util/SpotifyPlayer";
import React from "react";

export const useSpotifyPlayer = (accessToken: string, deviceId: string) => {
    const spotifyPlayer = new SpotifyPlayer(accessToken, deviceId);

    const [ isConnected, setIsConnected ] = useState(false);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ error, setError ] = useState<string | null>(null); 

    const play = async (trackUri: string, position?: number) => {
        const status = await spotifyPlayer.play(trackUri, position);
        if (status === 0) {
            setIsConnected(true);
            setIsPlaying(true);
            setError(null);
        } else if (status === 2) { // Spotify Player is connecting 
            setIsConnected(false);
            setIsPlaying(false);
            setError(null);
        } else {
            setIsConnected(false);
            setIsPlaying(false);
            setError('Error: Failed to play track');
        }
    }

    const stop = async () => {
        const status = await spotifyPlayer.stop();
        if (status === 0) {
            setIsConnected(true);
            setIsPlaying(false);
            setError(null);
        } else if (status === 2) { // Spotify Player is connecting 
            setIsConnected(false);
            setIsPlaying(false);
            setError(null);
        } else {
            setIsConnected(false);
            setIsPlaying(false);
            setError('Error: Failed to stop track');
        }
    }

    return {
        isConnected,
        error,
        isPlaying,
        play: React.useCallback(play, []),
        stop: React.useCallback(stop, []),
    };
}
