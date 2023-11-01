import { NextFunction, Request, Response  } from "express"
import { express } from 'express'
import axios, { AxiosResponse, AxiosError } from 'axios';

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET   ;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const clientUri = process.env.CLIENT_URI;

function generateRandomString(length: number) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

interface YourData {
    key: string;
    value: string;
}

export class SpotifyController {
    login(request: Request, response: Response, next: NextFunction) {
        const scope = "streaming \
            user-read-email \
            user-read-private \
            user-top-read \
            user-modify-playback-state"

        const state = generateRandomString(16);

        const auth_query_parameters = new URLSearchParams({
            response_type: "code",
            client_id: spotify_client_id,
            scope: scope,
            redirect_uri: redirectUri,
            state: state
        })

        response.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
    }

    async callback(req: Request, res: Response, next: NextFunction) {
        const { code } = req.query;

        if (!code) {
            res.status(400).send('Code not provided');
            return;
        }

        const data = new URLSearchParams();
        data.append('code', code as string);
        data.append('redirect_uri', redirectUri);
        data.append('grant_type', 'authorization_code');

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', data, {
                auth: {
                username: spotify_client_id,
                password: spotify_client_secret,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            });

            const { access_token, refresh_token, expires_in } = response.data;

            console.log(refresh_token);
            console.log(response.data)
            const expiration = Number(expires_in) * 1000;
            const expirationTime = Date.now() + expiration;

            res.cookie('access_token', access_token, {
                maxAge: expirationTime,
                httpOnly: true, 
            });

            res.redirect(clientUri);
        } catch (error) {
            console.error('Error getting tokens:', error);
            res.status(500).send('Error getting tokens');
        }
    }

    token(req: Request, res: Response, next: NextFunction) {
        // Retrieve the access_token from cookies
        const access_token = req.cookies.access_token;

        if (access_token) {
            // Send the access_token in the response
            res.json({ access_token });
        } else {
            // Handle the case when access_token is not found
            res.status(401).send('Access token not found');
        }
    }
}
