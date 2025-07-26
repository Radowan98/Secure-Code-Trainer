import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [glitchText, setGlitchText] = useState("Secure Code Trainer");
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Glitch animation effect for the title
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsAnimating(true);
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
        const glitched = "Secure Code Trainer".split('').map(char => 
          Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : char
        ).join('');
        setGlitchText(glitched);
        
        setTimeout(() => {
          setGlitchText("Secure Code Trainer");
          setIsAnimating(false);
        }, 200);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button red"></span>
            <span className="terminal-button yellow"></span>
            <span className="terminal-button green"></span>
          </div>
          <div className="terminal-title">secure-code-trainer.exe</div>
        </div>
        
        <div className="terminal-body">
          <div className="typing-container">
            <h1 className={`glitch-title ${isAnimating ? 'glitching' : ''}`}>{glitchText}</h1>
            <div className="console-line">
              <span className="console-prompt">$</span>
              <span className="typing-text">initializing security training module...</span>
            </div>
          </div>
          
          <div className="game-description">
            <div className="ascii-art">
              <pre>
{`  _____                      ___ _        
 / ____|                    |__ \\ |       
| (___   ___  ___ _   _ _ __   ) | |_ ___ 
 \\___ \\ / _ \\/ __| | | | '__|  / /| __/ _ \\
 ____) |  __/ (__| |_| | |    / /_| || (_) |
|_____/ \\___|\\___|\\__,_|_|   |____|\\__\\___/
                                           `}
              </pre>
            </div>
            <p className="blink">Learn to detect vulnerabilities in code while playing a fun game!</p>
          </div>
          
          <div className="matrix-background"></div>
          
          <div className="game-menu">
            <Link to="/nickname">
              <button className="btn primary-btn">
                <span className="btn-text">START MISSION</span>
                <span className="btn-icon">▶</span>
              </button>
            </Link>
            <Link to="/leaderboard">
              <button className="btn secondary-btn">
                <span className="btn-text">VIEW LEADERBOARD</span>
                <span className="btn-icon">🏆</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="cybersecurity-icons">
        <div className="icon-container">
          <div className="icon-item">🔒</div>
          <div className="icon-label">Secure</div>
        </div>
        <div className="icon-container">
          <div className="icon-item">⚔️</div>
          <div className="icon-label">Defend</div>
        </div>
        <div className="icon-container">
          <div className="icon-item">🛡️</div>
          <div className="icon-label">Protect</div>
        </div>
      </div>
    </div>
  );
};

export default Home;