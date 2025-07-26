import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { submitAnswer, fetchRandomCode } from '../api/api.js';
import { useSpring, animated } from 'react-spring'; // For animations
import { motion } from 'framer-motion'; // For smoother button effects
import '../styles.css';  // Ensure styles are properly imported

const Game = () => {
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(10);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [answerDetails, setAnswerDetails] = useState(null);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0); // Points system
  const location = useLocation();
  const nickname = new URLSearchParams(location.search).get('nickname') || 'Guest';

  useEffect(() => {
    fetchQuestion();

    const timerInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerInterval);
          handleAnswer('Timeout');  // Handle timeout scenario
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const fetchQuestion = async () => {
    try {
      const data = await fetchRandomCode();
      setQuestion(data);
      setTimer(10);
      setIsAnswerCorrect(null);
      setAnswerDetails(null);
    } catch (error) {
      console.error('Error fetching random code:', error);
    }
  };

  const handleAnswer = async (userChoice) => {
    if (!question) return;

    const result = await submitAnswer(nickname, question.id, userChoice);

    setIsAnswerCorrect(result.correct);
    setAnswerDetails(result);

    if (result.correct) {
      setStreak(streak + 1);
      setPoints(points + 10);  // Increase points on correct answer
    } else {
      setStreak(0);
    }
  };

  const questionProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="game-container">
      {question && (
        <div className="game-box">
          <h2 className="nickname-display">Player: {nickname}</h2>
          <h3 className="streak-display">🔥 Streak: {streak}</h3>
          <h3 className="points-display">🏆 Points: {points}</h3>

          {/* Code Display Box */}
          <animated.div style={questionProps} className="code-box">
            <pre>{question.code}</pre>
          </animated.div>

          {/* Countdown Timer Display */}
          <h3 className="timer-display">⏳ {timer} seconds left</h3>

          {/* Option Buttons */}
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleAnswer('Safe')}>
            Safe
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleAnswer('Vulnerable')}>
            Vulnerable
          </motion.button>
        </div>
      )}

      {/* Answer Feedback */}
      {isAnswerCorrect !== null && (
        <div className="feedback-box">
          <p className={isAnswerCorrect ? 'correct' : 'incorrect'}>
            {isAnswerCorrect ? '✅ Correct!' : '❌ Incorrect!'}
          </p>

          {/* Show the correct answer and explanation if the user is incorrect */}
          {answerDetails && !isAnswerCorrect && (
            <div>
              <h3>Correct Answer: {answerDetails.correct_answer}</h3>
              <p><strong>Reason:</strong> {answerDetails.reason}</p>
              {answerDetails.solution && <p><strong>Solution:</strong> {answerDetails.solution}</p>}
              {answerDetails.vulnerability_type && (
                <p><strong>Vulnerability Type:</strong> {answerDetails.vulnerability_type}</p>
              )}
            </div>
          )}

          {/* Next Challenge Button */}
          <motion.button whileHover={{ scale: 1.1 }} onClick={fetchQuestion}>
            Next Challenge
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Game;
