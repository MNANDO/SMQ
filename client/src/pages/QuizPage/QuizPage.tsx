import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSpotify } from '../../context/SpotifyContext';
import PlaybackButton from '../../components/PlaybackButton';
import { Grid, Button } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';

type Track = {
    uri: string,
    name: string,
    durationMs: number,
}


const QuizPage = () => {
    const { accessToken } = useSpotify();
    const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);
    const [ answer, setAnswer ] = useState<string>('');
    const [deviceId, setDeviceId] = useState<string>('');

    useEffect(() => { // Connect to spotify and initialize the device ID
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

            player.connect();
        };
    }, []);

    return (
        <>
            <LoadingScreen />
        </>
    );
}

export default QuizPage;
