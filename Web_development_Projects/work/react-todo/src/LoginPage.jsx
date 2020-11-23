import React from 'react';
import {fetchLogIn} from './services';
import { useState } from 'react';
import DisplayLoggedInPage from './DisplayLoggedInPage';
import './App.css';

function LoginPage(){
    const [userInfo, setUserInfo] = useState();
    const [username, setUsername] = useState('');
    const [error, setError] = useState();

    const performLogin = (username) => {
        if (/^ *$/.test(username)) {
            setError("Enter a valid username");
            setUsername('');
        } else {
            setError('');
            fetchLogIn(username)
            .then((userInfo) => setUserInfo(userInfo.data.username))
            .catch((error) => setError(error.message))
        }   
    }

    if(userInfo) {
        return(
            <DisplayLoggedInPage userInfo={username} />
        );
    }

    return(
        <div className="login">
            <h2 className="error">{error}</h2>
            <label className="username">Username:<input value={username} onChange={(e) => setUsername(e.target.value)}/></label>
            <button className="login-button" onClick={() => performLogin(username)}>Login</button>
        </div>
    );

}

export default LoginPage;