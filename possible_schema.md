    `Users:
        UserID (Primary Key)
        Username
        Email
        Password
        FirstName
        LastName
        ProfilePictureURL
        RegistrationDate
        LastLogin

    UserSpotifyData:
        UserSpotifyDataID (Primary Key)
        UserID (Foreign Key)
        SpotifyAccessToken
        SpotifyRefreshToken
        SpotifyTokenExpiration
        SpotifyUserID (Spotify-specific user ID)

    Friends (to represent friend connections):
        FriendshipID (Primary Key)
        UserID1 (Foreign Key)
        UserID2 (Foreign Key)
        Status (e.g., Pending, Accepted, Declined)

    Favorites (to allow users to save their favorite artists, tracks, and genres):
        FavoriteID (Primary Key)
        UserID (Foreign Key)
        SpotifyArtistID
        SpotifyTrackID
        SpotifyGenreID
        Timestamp

    GenresLeaderboard (to track and compare users' genre interests):
        GenresLeaderboardID (Primary Key)
        SpotifyGenreID (Foreign Key)
        UserID (Foreign Key)
        Score

    SpotifyArtists:
        SpotifyArtistID (Primary Key)
        Name
        Popularity
        SpotifyURL

    SpotifyTracks:
        SpotifyTrackID (Primary Key)
        Name
        ArtistID (Foreign Key)
        Album
        SpotifyURL

    SpotifyGenres:
        SpotifyGenreID (Primary Key)
        Name`