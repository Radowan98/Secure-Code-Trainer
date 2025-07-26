import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Nickname from './components/Nickname';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import BackToHome from './components/BackToHome'; // Back to Home button component
import './styles.css'; // Import global styles

function App() {
  const location = useLocation();  // Get current route location

  return (
    <div className="App">
      <Routes>
        {/* Define Routes for different pages */}
        <Route path="/" element={<Home />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>

      {/* Only show BackToHome button on non-Home pages */}
      {location.pathname !== '/' && <BackToHome />}
    </div>
  );
}

export default App;
