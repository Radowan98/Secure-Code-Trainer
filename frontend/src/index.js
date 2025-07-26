import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import global styles
import App from './App';  // Main App component
import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter

// Create the root element for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap App in Router (this should be the only Router)
root.render(
  <Router>
    <App />
  </Router>
);
