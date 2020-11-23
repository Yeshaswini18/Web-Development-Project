import React from 'react';
import './App.css';

function DisplayMessages({message}) {

    return(
        Object.keys(message).map((messageId) => (
            <li className="message" key={messageId}><div className="meta-info"><span className="user">{message[messageId].user}</span>
            <span className="at">@</span><span className="time-stamp">{message[messageId].timeStamp}</span></div>
            <p className="text-message">{message[messageId].text}</p></li>
        ))           
    );
}

export default DisplayMessages;
