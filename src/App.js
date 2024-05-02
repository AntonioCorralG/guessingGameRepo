import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GuessGameContainer } from "./GameContainer";
import { PlayerStats } from "./PlayerStats";
import { UserSettings } from "./UserSettings";

function App() {
  const [settings, setSettings] = useState({
    numberOfGuessesAllowed: 5,
    numberRangeMin: 1,
    numberRangeMax: 100,
  });

  const [gameStats, setGameStats] = useState({
    gamesWon: 0,
    gamesLost: 0,
    sumOfGuesses: 0,
    numberOfGamesPlayed: 0,
  });


  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const updateGameStats = (newStats) => {
    setGameStats(prevStats => ({
      ...prevStats,
      ...newStats,
    }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuessGameContainer {...settings}  updateGameStats={updateGameStats} gameStats={gameStats}  />} />
        <Route path="/settings" element={<UserSettings updateSettings={updateSettings} />} />
        <Route path="/stats" element={<PlayerStats gameStats={gameStats} />} />
      </Routes>
    </Router>
  );
}

export default App;
