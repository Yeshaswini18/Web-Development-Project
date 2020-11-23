import React, {useEffect, useState} from 'react';
import DisplayChatPage from './DisplayChatPage';
import {fetchHomePage} from './services';
import LoginPage from './LoginPage';
import './App.css';

function InitialPage() {
    const [message, setMessage] = useState({});
    const[error, setError] = useState("");
    let content;
    useEffect(() => {
        setError('');

        fetchHomePage()
        .then(messages => setMessage(messages))
        .catch(error => setError(error));     
    },[]);

    if (message.isLoggedin) {
        content = <DisplayChatPage messageIds={message} />                    
    } else {
        content = <LoginPage />
    }

    return(
        <div>
            <h2 className="error">{error}</h2>
            {content}

        </div>
    );     

}

export default InitialPage;
