import React from 'react';
import {fetchLogIn} from './services';
import { useState } from 'react';
import LoggedInPage from './LoggedInPage';
import MovieList from './MovieList';
import './App.css';

function LoginPage({movies}){
    const [userInfo, setUserInfo] = useState();
    const [username, setUsername] = useState('');
    const [error, setError] = useState();

    const performLogin = (username) => {
        if (/^ *$/.test(username) || username.includes('dog')) {
            setError("Enter a valid username");
            setUsername('');
        } else {
            setError('');
            fetchLogIn(username)
            .then((userInfo) => setUserInfo(userInfo.data))
            .catch((error) => setError(error.message))
        }   
    }

    if(userInfo) {
        return(
            <LoggedInPage userInfo={userInfo.username}  movies={movies}/>
        );
    }

    return(
        <div className="login">
            <h2 className="error">{error}</h2>
            <h3 className="warning">Please Login to Book</h3>
            <div className="form">
                <label className="username">Username:<input value={username} onChange={(e) => setUsername(e.target.value)}/></label>
                <button className="login-button" onClick={() => performLogin(username)}>Login</button>
            </div>
            <MovieList movies={movies} userInfo="    " status="loggedOut" />
        </div>
    );

}

export default LoginPage;
