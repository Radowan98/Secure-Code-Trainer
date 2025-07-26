import React, { useState, useEffect } from 'react';
import '../styles.css'; // Optional styling

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('http://localhost:8000/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>{entry.nickname}: {entry.score} points</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
