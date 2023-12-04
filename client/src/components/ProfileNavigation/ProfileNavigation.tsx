import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { height } from '@mui/system';
import React, { useEffect, useState } from 'react'


import { useSpotify } from '../../context/SpotifyContext';

import './ProfileNavigationStyles.css';

import { Link } from 'react-router-dom';

const ProfileNavigation = (props : {}) => {
    const { logout, accessToken } = useSpotify();
    const [ userDisplayName, setUserDisplayName ] = useState<string>('');
    const [ userProfileImageUrl, setUserProfileImageUrl ] = useState<string>('');
    const [showSubMenu, setShowSubMenu] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const displayName = data.display_name;
                    setUserProfileImageUrl(data.images[1].url)
                     
                    setUserDisplayName(displayName);
                } else {
                    console.error('Error retrieving user information:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
        getUserInfo();
    }, [accessToken]); 

    const handleOnClick = () => {
        setShowSubMenu(!showSubMenu);
    }

    return (
        <div className="profile-navigation" onClick={handleOnClick}>
            <Avatar
                src={userProfileImageUrl}
                alt="User Profile"
                className="user-profile-image"
            />
            <span className="user-display-name">{userDisplayName}</span>
            <ArrowDropDown className="dropdown-icon" />
            {showSubMenu && (
                <div className="sub-menu">
                    <ul>
                        <li>
                            <Link to="/profilepage">Profile</Link>
                        </li>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Button variant='contained' color='error' onClick={logout}>Logout</Button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ProfileNavigation;
