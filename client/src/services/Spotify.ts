import axios, { AxiosResponse } from 'axios';

const CLIENT_ID = '466dbaeaf67b4aaeba42204d994487df';
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000';
export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`;

export const loginFunction = () => {
    console.log(CLIENT_ID)
    window.location.href = AUTH_URL;
}
