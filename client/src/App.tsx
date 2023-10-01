import React from 'react';
import LandingPage from './pages/LandingPage';

// Add react-router-dom imports
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// create router with JSX Route elements
const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <LandingPage /> } />
));

function App() {
  return (
    <div className="App">
        <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
