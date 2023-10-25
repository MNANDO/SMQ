export type SpotifyPlayerType = {
    accessToken: string;
    deviceId: string;
    play(trackUri: string): Promise<void>;
    stop(): Promise<void>;
}

class SpotifyPlayer {
    private accessToken: string;
    private deviceId: string;

    constructor (accessToken: string, deviceId: string) {
        this.accessToken = accessToken;
        this.deviceId = deviceId;
    }

    async play(trackUri: string, position?: number) {
        const url = `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`;

        const requestBody = JSON.stringify({
            uris: [trackUri],
            offset: {
                position: 0
            },
            position_ms: position
        });

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }

    async stop() {
        const url = `https://api.spotify.com/v1/me/player/pause?device_id=${this.deviceId}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
        
}

export default SpotifyPlayer;
