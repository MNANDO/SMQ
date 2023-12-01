export type SpotifyPlayerType = {
    accessToken: string;
    deviceId: string;
    isConnected: boolean;
    play(trackUri: string): Promise<void>;
    stop(): Promise<void>;
}

/**
 * SpotifyPlayer class for controlling playback on a Spotify player.
 */
class SpotifyPlayer {
    private _accessToken: string;
    private _deviceId: string;

    constructor (accessToken: string, deviceId: string) {
        this._accessToken = accessToken;
        this._deviceId = deviceId;
    }

    /**
     * Play a Spotify track.
     * @param {string} trackUri - The URI of the track to be played.
     * @param {number} [position] - The position to start playback from in milliseconds.
     * @returns {Promise<number>} - A promise that resolves to the status code:
     *   - 0: No error
     *   - 1: Error
     *   - 2: Not connected
     */
    async play(trackUri: string, position?: number) {
        const url = `https://api.spotify.com/v1/me/player/play?device_id=${this._deviceId}`;

        const requestBody = JSON.stringify({
            uris: [trackUri],
            offset: {
                position: 0
            },
            position_ms: position
        });

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this._accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });

            if (!response.ok) {
                if (response.status === 502) {
                    return 2;
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            return 0;
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message)
            } else {
                console.log('unknown error')
            }
        }
        return 1;
    }

    /**
     * Stop a Spotify track.
     * @returns {Promise<number>} - A promise that resolves to the status code:
     *   - 0: No error
     *   - 1: Error
     *   - 2: Not connected
     */
    async stop() {
        const url = `https://api.spotify.com/v1/me/player/pause?device_id=${this._deviceId}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this._accessToken}`,
                },
            });
            if (!response.ok) {
                if (response.status === 502) {
                    return 2;
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            return 0;
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            } else {
                console.log('unknown error');
            }
        }
        return 1;
    }
}

export default SpotifyPlayer;