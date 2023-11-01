import React, { useState, useEffect } from 'react'
import SpotifyPlayer, { SpotifyPlayerType } from '../../features/SpotifyPlayer';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { useSpotify } from '../../context/SpotifyContext';

const PlaybackButton = (props : {
    trackUri: string | null,
    position: number | null
}) => {
    const { trackUri, position } = props;
    const { accessToken } = useSpotify(); 
    const [isPlaying, setPlaying] = useState(false);
    const [isActive, setActive] = useState(false);
    const [deviceId, setDeviceId] = useState<string>('');

    useEffect(() => {
        console.log(position)
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken as string); },
                volume: 0.5
            });

            player.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                setDeviceId(device_id);
            });

            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                }).catch(() => {
                    console.log('play not active');
                });

            }));

            player.connect();
        };
    }, []);


    const handleClick = () => {
        console.log(deviceId);
        if (deviceId.length > 0) {
            const spotifyPlayer = new SpotifyPlayer(accessToken as string, deviceId); 
            if (isPlaying == false) {
                spotifyPlayer.play(trackUri as string, position as number);
                setPlaying(true);
                setTimeout(() => {
                    spotifyPlayer.stop();
                    setPlaying(false);
                }, 5000); // Total play time
            } 
        } else {
            console.error('player not ready');
        }
        
    }


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
