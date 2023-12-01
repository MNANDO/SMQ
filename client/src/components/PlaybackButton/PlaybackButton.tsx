import React, { useState, useEffect } from 'react';
import { useSpotifyPlayer } from '../../hooks/useSpotifyPlayer';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { useSpotify } from '../../context/SpotifyContext';

const PlaybackButton = (props: {
	deviceId: string;
	trackUri: string;
	position?: number;
}) => {
	const { trackUri, position, deviceId } = props;
	const { accessToken } = useSpotify();

    const [ timeoutId, setTimeoutId ] = useState<NodeJS.Timeout | undefined>();

	const spotifyPlayer = useSpotifyPlayer(accessToken as string, deviceId);

	const handleClick = async () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Start playback
        if (deviceId) {
            await spotifyPlayer.play(trackUri, position);

            // Schedule stopping playback after 5 seconds
            setTimeoutId(setTimeout(async () => {
                await spotifyPlayer.stop();
            }, 5000));
        }
	};

	useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
		const playTrackFor5Seconds = async () => {
			// Start playback
			if (deviceId) {
				await spotifyPlayer.play(trackUri, position);

				// Schedule stopping playback after 5 seconds
				setTimeoutId(setTimeout(async () => {
					await spotifyPlayer.stop();
				}, 5000));
			}
		};

		// Call the function to play the track
		playTrackFor5Seconds();

		// Cleanup function
		return () => {
			// Clear the timeout if the component unmounts or if the dependency values change
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [trackUri, deviceId, position, spotifyPlayer.play, spotifyPlayer.stop]);

	return (
		<div>
            { spotifyPlayer.isConnected && 
                <PlayCircleIcon
                    sx={{
                        fontSize: '50px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s', // Add a smooth transition effect
                        '&:active': {
                            transform: 'scale(0.9)', // Apply a scaling effect when clicked
                        },
                    }}
                    onClick={handleClick}
                >
                    play
                </PlayCircleIcon>
            }
            { !spotifyPlayer.isConnected && 
                <p>Connecting...</p> 
            }
		</div>
	);
};

export default PlaybackButton;
