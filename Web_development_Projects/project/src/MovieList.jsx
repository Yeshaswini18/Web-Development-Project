import React, { useState } from 'react';
import {fetchGetMovie} from './services';
import MovieDetails from './MovieDetails';

function MovieList({movies, status, userInfo}){
    const [error, setError] = useState();
    const [movieInfo, setMovieInfo] = useState();
    const [view, setView] = useState(false);
    const [language, setLanguage] = useState();
    const [movieType, setMovieType] = useState();
    const [location, setLocation] = useState();
    const [refresh, setRefresh] = useState(false);
    let filteredMovies;
    if (!movies) {
        filteredMovies = {};
    } else {
        filteredMovies = movies;
    }
    

    const performReadMovie = (movieId) => {       
        setError('');

        fetchGetMovie(movieId)
        .then((movieInfo) => {setMovieInfo(movieInfo.data); setView(true)})
        .catch((error) => setError(error.message))        
    }

    if (refresh) {
        if(language || movieType || location) {
            setLanguage();
            setLocation();
            setMovieType();
        } else {
            filteredMovies = movies;
            setRefresh(false);
        }
    }

    if(view) {
        return(
            <MovieDetails movieInfo={movieInfo} status={status} movies={movies} userInfo={userInfo}/>
        );
    }

    if (language) {
        if (language === "select-language") {
            setLanguage();
        } else {
            filteredMovies = Object.keys(filteredMovies).reduce(function(r,e) {
                if(language.includes(filteredMovies[e].language)) r[e] = filteredMovies[e]
                return r
            },{})
        }
    }

    if (movieType) {
        if(movieType === "select-Type") {
            setMovieType();
        } else {
            filteredMovies = Object.keys(filteredMovies).reduce(function(r,e) {
                if(movieType.includes(filteredMovies[e].movieType)) r[e] = filteredMovies[e]
                return r
            },{})
        }
    }

    if (location) { 
        if (location === "select-location") {
            setLocation();
        } else {
            filteredMovies = Object.keys(filteredMovies).reduce(function(r,e) {
                if(location.includes(filteredMovies[e].location)) r[e] = filteredMovies[e]
                return r
            },{})
        }  
    }

    return (   
        <div className="movies">
            <h2 className="error">{error}</h2>
            <h2 className="now-showing">Now showing</h2>
            <span className="filters">Apply Filters: </span>
            <span className="filter-language">
                <label for="language">Language:</label>
                <select id="language" name="language" onChange={(e) => setLanguage(e.target.value)} value={!language ? "select-language" : language} >
                <option>select-language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                </select>
            </span>
            <span className="filter-movietype">
                <label for="movie-type">Movie-Type:</label>
                <select name="movie-type" onChange={(e) => setMovieType(e.target.value)} value={!movieType ? "select-type" : movieType}>
                <option>select-type</option>
                <option value="Thriller">Thriller</option>
                <option value="Horror">Horror</option>
                <option value="Comedy">Comedy</option>
                </select>
            </span>
            <span className="filter-location">
                <label for="location">Location:</label>
                <select name="location" onChange={(e) => setLocation(e.target.value)} value={!location ? "select-location" : location}>
                <option>select-location</option>
                <option value="Washington">Washington</option>
                <option value="California">California</option>
                <option value="Nevada">Nevada</option>
                </select>
            </span>
            <button className="refresh" onClick={() => setRefresh(true)}>Reset</button>
            <div className="movie-images">
                {Object.keys(filteredMovies).map((movieId) => (
                    <img className="image" src={filteredMovies[movieId].poster} title={filteredMovies[movieId].title} onClick={() => performReadMovie(movieId)} alt=""/>
                ))} 
            </div>
        </div>     
    );
}

export default MovieList;
