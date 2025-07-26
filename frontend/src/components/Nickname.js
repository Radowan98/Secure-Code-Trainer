import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nickname = () => {
  const [nickname, setNickname] = useState('');

  const generateGuestName = () => {
    return 'Guest_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="nickname">
      <h2>Enter your nickname</h2>
      <input 
        type="text" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)} 
        placeholder="Enter nickname"
      />
      <div>
        <Link to={`/game?nickname=${nickname || generateGuestName()}`}>
          <button className="btn">Start Game</button>
        </Link>
      </div>
    </div>
  );
};

export default Nickname;
