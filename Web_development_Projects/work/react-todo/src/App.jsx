import  React from 'react';
import './App.css';
import DisplayLoggedInPage from './DisplayLoggedInPage';
import {fetchHomePage} from './services';
import LoginPage from './LoginPage';
import { useState, useEffect } from 'react';

function App() {
  const [userInfo, setUserInfo] = useState();
  const[error, setError] = useState();
  let content;

  useEffect(() => {
      setError('');

      fetchHomePage()
      .then(userInfo => setUserInfo(userInfo.data.username))
      .catch(error => setError(error.message));     
  },[]);

  if (error === "no valid session") {
    setError('     ')
  }

  if (error) {
    content = <LoginPage />
  } else {
    content = <DisplayLoggedInPage userInfo={userInfo}/>
  }

  return (
    <div className="App">
      <h2 className="error">{error}</h2>
      {content}
    </div>
  );            
}

export default App;
