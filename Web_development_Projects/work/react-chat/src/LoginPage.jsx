import React from 'react';
import {fetchLogIn} from './services';
import { useState } from 'react';
import DisplayChatPage from './DisplayChatPage';
import './App.css';

function LoginPage(){
    const [message, setMessages] = useState();
    const [username, setUsername] = useState('');
    const [error, setError] = useState("");

    const performLogin = (username) => {
        setError('');

        fetchLogIn(username)
        .then((userInfo) => setMessages(userInfo))
        .catch((error) => setError(error.error))
        setUsername('');
    }

    if(message) {
        return(
            <DisplayChatPage messageIds={message}/>
        );
    }

    return(
        <div className="login">
            <h2 className="error">{error}</h2>
            <label>Username:<input value={username} onChange={(e) => setUsername(e.target.value)}/></label>
            <button className="login-button" onClick={() => performLogin(username)}>Login</button>
        </div>
    );

}

export default LoginPage;
