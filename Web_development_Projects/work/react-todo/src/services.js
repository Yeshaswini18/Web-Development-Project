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

export const fetchGetTheme = (username) => {
    return fetch(`/theme/${username}`, {
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

export const fetchUpdateTheme = (username, theme) => {
    return fetch(`/theme/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            theme: theme
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

export const fetchGetTasks = (username) => {
    return fetch(`/tasks/${username}`, {
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

export const fetchDeleteTasks = (username) => {
    return fetch(`/tasks/${username}`, {
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

export const fetchAddTask = (username, task) => {
    return fetch(`/tasks/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: task
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

export const fetchGetTask = (username, taskId) => {
    return fetch(`/tasks/${username}/${taskId}`, {
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

export const fetchDeleteTask = (username, taskId) => {
    return fetch(`/tasks/${username}/${taskId}`, {
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

export const fetchUpdateTask = (username, taskId, task) => {
    return fetch(`/tasks/${username}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: task
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
