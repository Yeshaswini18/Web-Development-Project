import React from 'react';
import { topN , answer} from './questionInfo';
import './App.css';

const Questions = ({ count, changeCount, score, changeScore}) => {
    
    const verify = function(choice) {
        if (choice === answer(count-1).correct) {
            changeScore(score+1);
            answer(count-1).result = "correct";
        } else {
            answer(count-1).result = "incorrect";
        }
        changeCount(count+1);
    }

    return (
      <ul className="display-questions">
        { topN(count).map( question => (<li className="question" key={question.question}>{question.question}<br></br>
        <button key={question.answers[0]} onClick={() => verify(0)}>{question.answers[0]}</button><br></br>
        <button key={question.answers[1]} onClick={() => verify(1)}>{question.answers[1]}</button><br></br>
        <button key={question.answers[2]} onClick={() => verify(2)}>{question.answers[2]}</button><br></br>
        <button key={question.answers[3]} onClick={() => verify(3)}>{question.answers[3]}</button><br></br>
        <p className={question.result}>{question.result}</p></li>) ) }
      </ul>
    );
};

export default Questions;