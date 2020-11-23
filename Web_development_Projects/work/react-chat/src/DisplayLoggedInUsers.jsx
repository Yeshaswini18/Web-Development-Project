import React from 'react';
import './App.css';

function DisplayLoggedInUsers({loggedInUsers}) {
    return (
        <ul className="display-users">
          { loggedInUsers.map( loggedInUser => (<li className="logged-in-users" key={loggedInUser}>{loggedInUser}</li>) ) }
        </ul>
      );
}

export default DisplayLoggedInUsers;