import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';

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

type User = {
    uid: string,
    displayName: string,
}

interface SpotifyUserProfile {
	id: string;
	display_name: string | null;
}

type SpotifyContextType = {
	accessToken: string | null;
    user: User | null;
	login: () => void;
	logout: () => void;
};

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({
	children,
}) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);

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
		};
		getAccessToken();
	}, []);

	useEffect(() => {
		async function getUserProfile(): Promise<void> {
			try {
				const response = await fetch('https://api.spotify.com/v1/me', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch user profile. Status: ${response.status}`
					);
				}

				const data: SpotifyUserProfile = await response.json();

				const userId: string = data.id;
				const displayName: string | null = data.display_name;

                setUser({
                    uid: userId,
                    displayName: displayName ?? ''
                })
			} catch (error) {
				console.error('Error fetching user information:', error);
			}
		}
        if (accessToken) {
            getUserProfile();
        }
	}, [accessToken]);

	const login = async () => {
		window.location.href = `${apiUri}/auth/login`;
	};

	const logout = () => {
		setAccessToken(null);
	};

	return (
		<SpotifyContext.Provider value={{ accessToken, user, login, logout }}>
			{children}
		</SpotifyContext.Provider>
	);
};
