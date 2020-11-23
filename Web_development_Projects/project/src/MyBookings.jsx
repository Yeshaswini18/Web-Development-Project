import React from 'react';
import {useState} from 'react';
import LoggedInPage from './LoggedInPage';
import './App.css';
import {fetchDeleteBooking} from './services';

function MyBookings({bookings, movies, userInfo, performViewBookings}) {
    const [back, setBack] = useState(false);
    const [error, setError] = useState();
    console.log(bookings);
    const performDelete = (bookingId) => {       
        setError('');

        fetchDeleteBooking(userInfo, bookingId)
        .then(() => performViewBookings())
        .catch((error) => setError(error.message))        
    }

    if(back){
        return(
            <div>
                <LoggedInPage userInfo={userInfo} movies={movies}/>
            </div>
        );       
    }

    return(
        <div className="bookings">
            <h2 className="error">{error}</h2>
            <h2 className="welcome-message">Hey {userInfo}!!! here are your Bookings</h2>
            <button className="back-button" onClick={() => setBack(true)}>Return to home page</button>
            {Object.keys(bookings).map((bookingId) => (    
                <div className="bookings-info">         
                    <img className="single-image" src={bookings[bookingId].poster} alt=""/>
                    <div className="movie-details">
                        <img className="QR-code" src={bookings[bookingId].QRcode} alt=""/>
                        <p className="title"><b>Title: </b>{bookings[bookingId].title}</p>
                        <p className="theater"><b>Theater: </b>{bookings[bookingId].theater}</p>
                        <p className="timing"><b>Timing: </b>{bookings[bookingId].timing}</p>
                        <p className="Date"><b>Date: </b>{bookings[bookingId].date}</p>
                        <p className="total"><b>Total: </b>{bookings[bookingId].total}</p> 
                        <button className="delete-booking" onClick={() => performDelete(bookingId)}>Cancel Booking</button>
                    </div>
                </div>              
            ))}
        </div>
    );
}

export default MyBookings;