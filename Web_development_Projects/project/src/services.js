export const fetchHomePage = () => {
    return fetch(`/session`, {
        method: "GET"
    })
    .catch( () => {
        return Promise.reject({message: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};

export const fetchLogIn = (username) => {
    return fetch(`/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username
        })
    })
    .catch( () => {
        return Promise.reject({message: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};

export const fetchLogOut = () => {
    return fetch('/session', {
        method: 'DELETE',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};

export const fetchGetMovies = () => {
    return fetch(`/movies`, {
        method: 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};

export const fetchGetMovie = (movieId) => {
    return fetch(`/movies/${movieId}`, {
        method: 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};

export const fetchAddBooking = (username, movieId, timing, date, tickets) => {
    return fetch(`/bookings/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            movieId: movieId,
            timing: timing,
            date: date,
            tickets: tickets
        })
    })
    .catch( () => {
        return Promise.reject({message: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};

export const fetchGetBooking = (username, bookingId) => {
    return fetch(`/bookings/${username}/${bookingId}`, {
        method: 'GET'
    })
    .catch( () => {
        return Promise.reject({message: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};

export const fetchDeleteBooking = (username, bookingId) => {
    return fetch(`/bookings/${username}/${bookingId}`, {
        method: 'DELETE'
    })
    .catch( () => {
        return Promise.reject({message: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};


export const fetchGetBookings = (username) => {
    return fetch(`/bookings/${username}`, {
        method: 'GET'
    })
    .catch( () => {
        return Promise.reject({message: 'network-error'});
    })
    .then( (response) => {
        if(response.ok) {
            return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    });
};
