import React, { useState } from 'react';
import TicketDetails from './TicketDetails';
import MovieList from './MovieList';
import './App.css';

function MovieDetails ({movieInfo, status, movies, userInfo}) {
    const [back, setBack] = useState(false);
    const [book, setBook] = useState(false);
    const [error, setError] = useState('');

    if (book){
        if (status === "loggedOut") {
            setError("Login to book")
            setBook(false);
        } else{
            return (
                <TicketDetails userInfo={userInfo}  movies={movies} movieInfo={movieInfo} status={status}/>
            );
        }      
    }

    if (back) {
        if (status === "loggedIn") {
            return(
                <div>
                    <MovieList movies={movies} userInfo={userInfo} status="loggedIn" />
                </div>               
            );
        } else {
            return(
                <div>
                    <MovieList movies={movies} userInfo="       " status="loggedOut" />
                </div>
            );
        }
    }

    return (   
        <div className="movie">
            <h2 className="error">{error}</h2>
            <button className="back-button" onClick={() => setBack(true)}>Return to Home Page</button>
            <div>
                <img className="single-image" src={movieInfo.poster} alt=""/>
                <div className="movie-details">
                    <p className="title"><b>Title: </b>{movieInfo.title}</p>
                    <p className="language"><b>Language: </b>{movieInfo.language}</p>
                    <p className="description"><b>Description: </b>{movieInfo.description}</p>
                    <p className="ratings"><b>Ratings: </b>{movieInfo.ratings}</p>
                    <p className="ticket-price"><b>ticket Price: </b>{movieInfo.ticketPrice}</p>
                    <p className="theater"><b>Theater: </b>{movieInfo.theater}</p>
                    <p className="expiry-date"><b>Played till:</b>{movieInfo.expiryDate}</p>
                    <label for="timings">Available timinigs:</label>            
                    {Object.keys(movieInfo.timings).map((timing) => (               
                        <button className="timing" value={movieInfo.timings[timing]}>{movieInfo.timings[timing]}</button>               
                    ))} 
                    <button className="book-button" onClick={() => setBook(true)}>Book</button> 
                </div> 
            </div>         
        </div>   
    );
}

export default MovieDetails;