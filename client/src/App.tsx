import React, { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import ProfilePage from "./pages/ProfilePage";
import Root from './pages/Root';

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom';

// Spotify
import { useSpotify } from './context/SpotifyContext';


function App() {
    const { accessToken } = useSpotify();

    useEffect(() => {
        console.log(accessToken)
    }, []);

    const appRouter = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Root />} >
            <Route index element={accessToken ? <Dashboard /> : <LandingPage />} />
            {/* Make dashboard protected */}
            {accessToken && <Route path="/quiz/:quizData" element={<QuizPage />} />}
            {accessToken && <Route path="/profilepage" element={<ProfilePage />} />}
        </Route>
    ));

    return (
        <div className="App">
            <RouterProvider router={appRouter} />
        </div>
   );
}

export default App;
