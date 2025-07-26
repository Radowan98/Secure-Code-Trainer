import React from 'react';
import { Link } from 'react-router-dom';

const BackToHome = () => {
  return (
    <div>
      <Link to="/">
        <button className="btn">Back to Home</button>
      </Link>
    </div>
  );
};

export default BackToHome;
