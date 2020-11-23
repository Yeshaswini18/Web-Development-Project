import React, {useState} from 'react';
import Questions from './Questions';
import Counter from './Counter';
import { resetResult, shuffleArray } from './questionInfo';
import './App.css';


function App() {
  const [count, setCount] = useState(1);   //count the turn
  const turnsTaken = "Turns taken";
  const scoreLabel = "score";
  const [score, setScore] = useState(0);
  const finalScore = "Final Score out of 5"; 

  const reset = function() {
      setCount(1);
      setScore(0);
      resetResult();
  }

  if (count > 5) {
    return(
      <div className="result-page">
        {finalScore}: {score}
        <p><button className="play-again" onClick={() => reset()}>Play Again</button></p>
      </div>
    )
  }

  if (count === 1) {
    shuffleArray();    //shuffle the array to generate random questions.
  }

  return (
    <div className="app">
        <h1>Welcome to your quiz</h1>
        <Counter count={count-1} turnsTaken={turnsTaken} score={score} scoreLabel={scoreLabel}/>
        <Questions count={count} changeCount={(newCount) => setCount(newCount)} score={score} 
        changeScore={(newScore) => setScore(newScore)} />
    </div>
  );
}

export default App;
