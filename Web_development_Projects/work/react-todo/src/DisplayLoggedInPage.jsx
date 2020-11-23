import React from 'react';
import LoginPage from './LoginPage';    
import { useState } from 'react';
import TodoPage from './TodoPage';
import { fetchLogOut, fetchUpdateTheme, fetchGetTheme } from './services';
import './App.css';


function DisplayLoggedInPage({userInfo}) {
    const [loggedOut, setloggedOut] = useState(false);
    const [theme, setTheme] = useState();
    const [error, setError] = useState();

    const performLogout = () => {
        setError('')

        fetchLogOut()
        .then(() => setloggedOut(true))
        .catch((error) => setError(error.message))
    }

    const performSetTheme = (theme) => {
        setError('')
        
        fetchUpdateTheme(userInfo, theme)
        .then(() => performGetTheme())
        .catch((error) => setError(error.message))
    }

    const performGetTheme = () => {
        setError('')
        
        fetchGetTheme(userInfo)
        .then((theme) => setTheme(theme.data))
        .catch((error) => setError(error.message))
    }

    if (loggedOut) {
        return (
            <LoginPage />
        );
    }

    return(
        <div>
            <div className={theme ? theme : "light"}>
                <h1 className="header">Welcome to your Page</h1>
                <h2 className="error">{error}</h2>
                <div className="choose-theme">
                    <label for="theme">Choose a theme:</label>
                    <select name="theme" id="themes" onChange={(e) => performSetTheme(e.target.value)}>
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                    <option value="colorful">colorful</option>
                    </select>
                </div>
            </div>
            <button className="logout-button" onClick={() => performLogout()}>Logout</button>
            <div className="todo-page">
                <TodoPage userInfo={userInfo} />
            </div>
        </div>
    );
}

export default DisplayLoggedInPage;