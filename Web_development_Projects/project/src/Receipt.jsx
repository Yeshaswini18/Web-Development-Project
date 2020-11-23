import React, { useState } from 'react';
import MovieList from './MovieList';
import './App.css';


function Receipt({receipt, userInfo, movies}) {
    const [back, setBack] = useState(false);

    if (back) {
        return(
            <div>
                <MovieList movies={movies} userInfo={userInfo} status="loggedIn" />
            </div>               
        );
    }


    return(
        <div className="receipt">
            <button className="back-button" onClick={() => setBack(true)}>Return to Home Page</button>
            <h2 className="welcome-message">Booking Successful!!!</h2>
            <div>
                <img className="single-image" src={receipt.poster} alt=""/>
                <div className="movie-details">
                    <img className="QR-code" src={receipt.QRcode} alt=""/>
                    <p className="title"><b>Title: </b>{receipt.title}</p>
                    <p className="theater"><b>Theater: </b>{receipt.theater}</p>
                    <p className="timing"><b>Timing: </b>{receipt.timing}</p>
                    <p className="Date"><b>Date: </b>{receipt.date}</p>
                    <p className="total"><b>Total: </b>{receipt.total}</p>
                </div>
            </div>
        </div>
    );

}

export default Receipt;