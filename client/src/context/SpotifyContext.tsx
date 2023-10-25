import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the type for the Spotify Context
type SpotifyContextType = {
    accessToken: string | null;
    login: () => void;
    logout: () => void;
};

// Create the SpotifyContext
const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

const apiUri = 'http://localhost:8888';

// Create a custom hook for using the SpotifyContext
export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotify must be used within a SpotifyProvider');
    }
    return context;
};

type SpotifyProviderProps = {
    children: ReactNode;
};

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);


    // Check for the access token only once when the component mounts
    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const response = await fetch(`${apiUri}/auth/token`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAccessToken(data.access_token);
            } catch (error) {
                setAccessToken(null);
            }
        }
        getAccessToken();
    }, []); 

    const login = async () => {
        window.location.href = `${apiUri}/auth/login`;
    };

    const logout = () => {
        setAccessToken(null);
    };

    return (
        <SpotifyContext.Provider value={{ accessToken, login, logout }}>
            {children}
        </SpotifyContext.Provider>
   );
};
