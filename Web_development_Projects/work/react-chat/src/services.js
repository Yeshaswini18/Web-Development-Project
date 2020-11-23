export const fetchHomePage = () => {
    return fetch(`/home`, {
        method: "GET"
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
  
export const fetchLogOut = () => {
    return fetch('/logout', {
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
  
export const fetchMessages = (message) => {
    return fetch('/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: message
        })
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

export const fetchLogIn = (username) => {
    return fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: username
        })
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
