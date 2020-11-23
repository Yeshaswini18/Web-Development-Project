import React from 'react';
import {fetchLogOut, fetchGetBookings} from './services';
import {useState} from 'react';
import LoginPage from './LoginPage';
import MovieList from './MovieList';
import MyBookings from './MyBookings';
import './App.css';

function LoggedInPage({userInfo, movies}) {
    const [error, setError] = useState();
    const [loggedOut, setloggedOut] = useState(false);
    const [bookings, setBookings] = useState();

    const performLogout = () => {
        setError('');

        fetchLogOut()
        .then(() => setloggedOut(true))
        .catch((error) => setError(error.message))
    }

    const performViewBookings = () => {
        setError('');

        fetchGetBookings(userInfo)
        .then((bookings) => setBookings(bookings.data))
        .catch((error) => setError(error.message))
    }

    if (loggedOut) {
        return (
            <LoginPage movies={movies}/>
        );
    }

    if (bookings) {
        return(
            <div>              
                <MyBookings bookings={bookings} movies={movies} userInfo={userInfo} performViewBookings={() => performViewBookings()}/>
            </div>
        );
    }

    return(
        <div> 
            <h2 className="error">{error}</h2>
            <button className="logout-button" onClick={() => performLogout()}>Logout</button>
            <button className="customers-booking" onClick={()=>performViewBookings()}>Your bookings</button>
            <h2 className="welcome-message">Hello {userInfo} !! </h2>
            <MovieList movies={movies} userInfo={userInfo} status="loggedIn" />
        </div>
    );
}

export default LoggedInPage;
