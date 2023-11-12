import React, { useState, useEffect } from 'react'
import SpotifyPlayer from '../../features/SpotifyPlayer';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { useSpotify } from '../../context/SpotifyContext';

const PlaybackButton = (props : {
    deviceId: string,
    trackUri: string,
    position?: number,
    duration?: number // duration in ms
}) => {
    const { duration, trackUri, position, deviceId } = props;
    const { accessToken } = useSpotify(); 
    const [isPlaying, setPlaying] = useState(false);

    const handleClick = () => {
        console.log(deviceId);
        const spotifyPlayer = new SpotifyPlayer(accessToken as string, deviceId); 
        if (isPlaying == false) {
            spotifyPlayer.play(trackUri as string, position as number);
            setPlaying(true);
            setTimeout(() => {
                spotifyPlayer.stop();
                setPlaying(false);
            }, duration); // Total play time
        } 
    }

    useEffect(() => {
        const spotifyPlayer = new SpotifyPlayer(accessToken as string, deviceId); 
        spotifyPlayer.stop();
        setPlaying(false)
        if (isPlaying == false) {
            spotifyPlayer.play(trackUri as string, position as number);
            setPlaying(true);
            setTimeout(() => {
                spotifyPlayer.stop();
                setPlaying(false);
            }, duration); // Total play time
        } 
    }, [trackUri]);

    return (
        <div>
            <PlayCircleIcon 
                sx={{
                    fontSize: '50px',  // Make the icon bigger
                    cursor: 'pointer', // Change cursor on hover to a pointer
                 }}
                onClick={handleClick}
            >
            play</PlayCircleIcon>

        </div>
    );
};

export default PlaybackButton;
