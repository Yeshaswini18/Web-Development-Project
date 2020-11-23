import React from 'react';
import {useState} from 'react';
import MovieList from './MovieList';
import {fetchAddBooking, fetchGetBooking} from './services';
import Receipt from './Receipt';
import './App.css';

function TicketDetails ({userInfo, movies, movieInfo, status}){
    const [error, setError] = useState();
    const [timing, setTimings] = useState();
    const [date, setDate] = useState();
    const [tickets, setTickets] = useState(1);
    const [back, setBack] = useState(false); 
    const [receipt, setReceipt] = useState();
    let total = movieInfo.ticketPrice * tickets;

    if (date) {
        const today = Date.now();
        const todayDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today);
        const expiryDate = movieInfo.expiryDate;
        const selectedDate = new Date(date.slice(0,4), date.slice(5,7)-1, date.slice(8,10));
        const lastDate = new Date(expiryDate.slice(6,10), expiryDate.slice(0,2)-1, expiryDate.slice(3,5));
        const presentDate = new Date(todayDate.slice(6,10), todayDate.slice(0,2)-1, todayDate.slice(3,5));
        if(selectedDate > lastDate || selectedDate < presentDate){
            setError("Enter a valid Date");
            setDate();
        }
    }

    const performCheckout = () => {
        setError('');

        if (!date || !timing || tickets < 1) {
            setError("All fields are required and has to be valid");
        } else if (tickets - Math.floor(tickets) !== 0) {
            setError("Enter a valid ticket count");
        } else {
            fetchAddBooking(userInfo, movieInfo.movieId, timing, date, tickets)
            .then((receipt) => performReadBooking(receipt.data))
            .catch((error) => setError(error.message))
        }
    }

    const performReadBooking = (bookingId) => {
        setError('');

        fetchGetBooking(userInfo, bookingId)
        .then((receipt) => setReceipt(receipt.data))
        .catch((error) => setError(error.message))

    }

    if (receipt) {
        return(
            <Receipt receipt={receipt} movies={movies} userInfo={userInfo}/>
        );
    }

    if(back){
        return(
            <MovieList movies={movies} userInfo={userInfo} status="loggedIn"/>
        );       
    }

    return(
        <div className="booking">
            <h2 className="error">{error}</h2>
            <button className="back-button" onClick={() => setBack(true)}>Return to Home Page</button>
            <div>
                <img className="single-image" src={movieInfo.poster} alt=""/>
                <div className="movie-details">
                    <p className="title"><b>Title: </b>{movieInfo.title}</p>
                    <p className="language"><b>Language: </b>{movieInfo.language}</p>
                    <span className="timings">
                        <label for="time">Select Timings:</label>
                        <select name="time" onChange={(e) => {setTimings(e.target.value)}}>
                            <option value="select-time">select-time</option>
                            {Object.keys(movieInfo.timings).map((timing) => (               
                                <option value={movieInfo.timings[timing]}>{movieInfo.timings[timing]}</option>               
                            ))}
                        </select>
                    </span>
                    <p className="expiry-date"><b>Played till:</b>{movieInfo.expiryDate}</p>
                    <p>
                        <label for="Date">Select date:</label>
                        <input type="date" name="movie-date" onChange={(e) => setDate(e.target.value)}/>
                    </p>
                    <label>Number of Tickets: </label><input type="number" name="tickets" value={tickets} onChange={(e) => setTickets(e.target.value)}/>
                    <h3 className="total-cost">Total Amount:${total}</h3>
                    <button className="checkout-button" onClick={() => performCheckout()}>checkout</button>
                </div>
            </div>
        </div>
    );
}

export default TicketDetails;
