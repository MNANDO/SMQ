# SMS
SMS is a web application that harnesses the Spotify web API to bring music listeners closer together. This platform allows users to create profiles and connect with friends to share favorite artists, tracks, and genres. This platform will also feature a leaderboard of genres that compare users’ interests. 

## Features 
### p0:

> - User auth
> - Invite system
> - Top artist data
> - Friend system
> - “Who’s the bigger fan”
> - Leaderboard by genre

### p1:

> - Create playlist based on users top artists

### p2:
> - Reviews? (credibility based on artist/genre data) add recommendations on your profile
> - Top track data
> - Archive

## Goals

> - Get top artists from users and count the genres 

## Non-goals

> - No live playback status

## UX

> CUJ (Critical User Journey)
>> Landing page to explain site
>> Login profile system
>> Basic charts/data interpretation
>> Leaderboard
> Cards

## Engineering details 

> Stack
>> relational schema for database
>> Firebase database? (recommended)
> Rendering 
> Persistence
>> Initial call to Spotify to fetch users top artists when they sign up and track then store within our DB

## Next Steps
