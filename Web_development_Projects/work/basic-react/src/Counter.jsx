import React from 'react';
import './App.css';

const Counter = ({ count , turnsTaken, scoreLabel, score}) => {
  return (
    <div className="display-result">
      <p>{turnsTaken}: {count}</p>
      <p>{scoreLabel}: {score}</p>
    </div>
  );
};

export default Counter;