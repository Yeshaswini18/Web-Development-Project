export const fetchLogIn = (username) => {
    return fetch(`/session`, {
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
  
export const fetchLogOut = () => {
    return fetch('/session', {
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
  
export const fetchRecipes = () => {
    return fetch('/recipes', {
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

export const fetchAddRecipes = (addTitle, addAuthor, addIngredients, addInstructions) => {
    return fetch('/recipes', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: addTitle,
            author: addAuthor,
            ingredients: addIngredients,
            instructions: addInstructions
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

export const fetchRecipe = (recipeId) => {
    return fetch(`/recipes/${recipeId}`, {
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
