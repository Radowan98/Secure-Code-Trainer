import axios from 'axios';

// Set up the base URL for the API (using environment variables)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Fetch a random code challenge
export const fetchRandomCode = async () => {
  try {
    const response = await axios.get(`${API_URL}/game/question`);
    return response.data;  // Returns the random code snippet
  } catch (error) {
    console.error('Error fetching random code:', error);
    throw error;  // Rethrow the error for handling in components
  }
};

// Submit the user's answer and return the result
export const submitAnswer = async (nickname, codeId, userChoice) => {
  try {
    const response = await axios.post(`${API_URL}/game/answer`, {
      nickname,
      code_id: codeId,
      user_choice: userChoice
    });
    return response.data;  // Returns whether the answer was correct, and additional details
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
};

// Fetch the leaderboard (top 5 players)
export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/leaderboard`);
    return response.data;  // Returns the leaderboard data
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

// Update the leaderboard with a new score
export const updateLeaderboard = async (nickname, score) => {
  try {
    const response = await axios.post(`${API_URL}/leaderboard/update`, {
      nickname,
      score
    });
    return response.data;  // Returns the updated leaderboard
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    throw error;
  }
};
