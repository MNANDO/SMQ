interface Image {
    url: string;
    width: number;
    height: number;
}

export const spotifyPlaylistData = async () => {

}


export type TrackData = {
    trackId: string,
    trackTitle: string,
    duration: number, 
} 

/**
 * Fetches all tracks associated with a specified playlist 
 * @param playlistId 
 * @param accessToken 
 * @returns Promise<TrackData[] | null>
 */
export const spotifyPlaylistTrackData = async (playlistId: string, accessToken: string): Promise<TrackData[] | null> => {
    try {
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch tracks: ${response.statusText}`);
        }

        const data = await response.json();

        const tracks: TrackData[] = data.items.map((item: any) => {
            const track = item.track;
            return {
                trackId: track.uri,
                trackTitle: track.name,
                duration: track.duration_ms
            };
        });
        return tracks;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null;
        }
    }
    return null;
}


export interface TopSongs {
    id: string;
    name: string;
    images?: Image[];
}

/**
 * Fetches a users top 4 songs
 * @param accessToken 
 * @returns Promise<TopSongs[] | null>
 */
export const spotifyUserTopSongData = async (accessToken: string): Promise<TopSongs[] | null> => {
    try{
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=4', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.items) {
                return data.items;
            } else {
                throw new Error('Top Songs data not found');
            }
        } else {
            throw new Error('Failed to fetch Top Songs');
        }
    } catch(error) {
        console.error('failed to retrieve data');
        return null;
    }
}

export interface TopArtists {
    id: string;
    name: string;
    images?: Image[];
}

/**
 * Fetches a users top 4 artists  
 * @param accessToken 
 * @returns Promise<TopArtists[] | null>
 */
export const spotifyUserTopArtistData = async (accessToken: string): Promise<TopArtists[] | null> => {
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