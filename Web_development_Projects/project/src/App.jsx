import React from 'react';
import {fetchHomePage} from './services';
import { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import LoggedInPage from './LoggedInPage';
import './App.css';

function App() {
    const [userInfo, setUserInfo] = useState();
    const[error, setError] = useState();
    const [movies, setMovies] = useState({});
    let content;

    useEffect(() => {
        setError('');
  
        fetchHomePage()
        .then(userInfo => {setUserInfo(userInfo.data.sid.username); setMovies(userInfo.data.moviesList)})
        .catch(error => {setError(error.message); setMovies(error.data)});  
    },[]);

    if (error === "no valid session") {
        setError("  ")
    }
    
    if (error) {
        content = <LoginPage movies={movies}/>  
    } else {
        content = <LoggedInPage userInfo={userInfo} movies={movies}/>
    }

    return (
        <div className="App">
            <h1 className="main-heading">Book your show!!</h1>
            <h2 className="error">{error}</h2>
            {content}
        </div>
    );            

};

export default App;
