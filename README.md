# Spotify Music Quiz

## Description

SMQ is a Quiz platform that integrates with Spotify to offer users an interactive experience centered around music. Users log in using their Spotify accounts, granting access to their playlists. Upon accessing the dashboard, they can select a playlist from their Spotify library, choose the number of questions, and set a time limit.

After configuring their preferences, users engage in a quiz that plays short song clips from the selected playlist. Their task is to identify the song title corresponding to the audio snippet they hear. As users progress through the quiz, they accumulate points based on their correct answers.

Upon completing the quiz, users are redirected to a results page displaying their quiz performance. Here, they can review their answers, see their score, and potentially share their achievements on social media or with friends. The platform provides an entertaining way for users to test their knowledge of songs within their Spotify playlists while enjoying a fun and interactive quiz experience.

## Features
P0:
User auth Spotify single sign on
Music quiz
Quiz results with share button 
P1:
Quiz customization (timer, length)
Share the same quiz with other people via link 
P2:
Persistence with firebase 
Profile page

## Goals
Allow the user to take a quiz based on their spotify data
Give meaningful quiz results based on how well the user knows their spotify music/artists
Allow the user to sync their spotify login and user data within the app

## Non-goals
Multiplayer with socket.io
No specific track data
shareable link to the result of the quiz
Quiz by favorite artists
Quiz by favorite songs
## UX
### CUJs (Critical User Journeys)
Basic Quiz Functionality:
A user will land on the homepage of the site where they are greeted and given a brief summary of what the application does. There will be a call to action for the user to begin using the app
Once the call to action is clicked, the user will be taken to a spotify OAuth login page where they will log in using their spotify credentials. 
The user will be redirected to a dashboard upon login where they can press a button and be redirected to a new page to begin playing 
The user will be able to play the quiz and when they are finished they will be redirected to a results page where they can view their quiz results and click a button to be redirected back to the dashboard where they can play again. 
Advanced Quiz Functionality (p1):
quiz features lyric questions
Customization page set timer length, number of questions
### Views
landing page
login (spotify)
customization of quiz
quiz
results
## Engineering details 
### Frontend 
React, Typescript, MUI
### Dev ops
Docker 
### Backend
Node + Express

