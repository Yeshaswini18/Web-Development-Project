import React from 'react'
import { useState } from 'react';
import { fetchMessages , fetchLogOut} from './services';
import DisplayMessages from './DisplayMessages';
import LoginPage from './LoginPage';    
import DisplayLoggedInUsers from './DisplayLoggedInUsers';
import './App.css';

function DisplayChatPage({messageIds}) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState();
    const [messageId, setMessageIds] = useState(messageIds);
    const [loggedOut, setloggedOut] = useState(false);
    let content = <DisplayMessages message={messageId.messages}/>;
    
    const performSend = () => {
        setError('');

        fetchMessages(message)
        .then((messageIds) => setMessageIds(messageIds))
        .catch((error) => setError(error.error))
        setMessage('');
    }

    const performLogout = () => {
        setError('')

        fetchLogOut()
        .then(() => setloggedOut(true))
        .catch((error) => setError(error.error))
    }

    if (loggedOut) {
        return (
            <LoginPage />
        );
    }

    return (
        <div>
            <div>
                <button className="logout-button" onClick={() => performLogout()}>Logout</button>
            </div>
            <div className="active-users">
                <h3 className="header">Active Users</h3>
                <DisplayLoggedInUsers loggedInUsers={messageId.loggedInUsers}/>              
            </div>
            <div className="display-panel">
                <p className={error}>{error}</p>
                <ol className="send-messages">
                    <div className="messsage">
                        {content}
                    </div>
                </ol>
            </div>
            <div className="send-form">
                <label>Enter your message<input value={message} onChange={(e) => setMessage(e.target.value)}/></label>
                <button onClick={() => performSend()}>Send</button>
            </div>
        </div>       
    );
  }
  
export default DisplayChatPage;
