(function IIFE() {

    const addButton = document.querySelector('.outgoing button');
    const list = document.querySelector('.items');
    const newItem = document.querySelector('.item-to-add');
    const newQuantity = document.querySelector('.quantity-to-add');
    const status = document.querySelector('.status');
    const loginButton = document.querySelector('.login-credentials button');
    const username = document.querySelector('.username');
    const logout = document.querySelector('.logout');

    document.getElementById("item-lists").className = "disabled";
    document.getElementById("loading").className = "disabled";


    const errMsgs = {
        "Conflict": 'That name already exists',
        'network-error': 'There was a problem connecting to the network, try again',
        'Unauthorized' : 'Enter a valid Username',
        'Bad Login': 'Not a valid input'
    };

    // initial status
    addButton.disabled = true;

    function updateStatus( message ) {
        if (typeof message !== 'undefined') {
          status.innerText = message;
        }
    }
  
    function showLoginPage() {
      username.value = ""
      document.getElementById("login-page").className = "";
      document.getElementById("loading").className = "disabled";
      document.getElementById("item-lists").className = "disabled";
    }

    function showListPageAfterLoading() {
      document.getElementById("login-page").className = "disabled";
      document.getElementById("loading").className = "";
      document.getElementById("loading").className = "disabled";
      document.getElementById("item-lists").className = "";
    }

    function renderItems( itemIds ) {
        const html = Object.keys(itemIds).map(
          (itemId) => `
            <li>
              <span class="name" data-id="${itemId}">${itemIds[itemId].name}</span>
              <button class="delete" type="button" data-id="${itemId}">X</button>
              <input type="number" class="quantity" data-id="${itemId}" value="${/^ *$/.test(itemIds[itemId].quantity) ? 0 : itemIds[itemId].quantity}"/>
              <button class="update" type="button" data-id="${itemId}">Update</button>
            </li>`
        ).join('');
        list.innerHTML = html;
    }

    function resetPage(itemIds) {
        newItem.value = '';
        newQuantity.value = '';
        addButton.disabled = true;  
        updateStatus('');
    }

    newItem.addEventListener('keyup', function (event) {
        const text = event.target.value;
        addButton.disabled = !text;
    });

    username.addEventListener('keyup', function (event) {
      const text = event.target.value;
      loginButton.disabled = !text;
  });

    function convertError(response) {
        if(response.ok) {
          return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    } 

    list.addEventListener('click', (e) => {
        const itemId = e.target.dataset.id;
        if(e.target.classList.contains('delete') ) { 
          fetch(`/items/${itemId}`, {
            method: 'DELETE',
          })
          .catch( () => Promise.reject( { error: 'network-error' }) )
          .then( convertError )
          .then( itemIds => {
            renderItems(itemIds);
            updateStatus('');
          })
          .catch( err => {
            renderItems(err.items);
            updateStatus(errMsgs[err.error] || err.error);
          });
        }

        if(e.target.classList.contains('update') ) { 
            const updatedQuantity = document.querySelector('.quantity');
            const integer = updatedQuantity.value;

            fetch(`/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: integer
                })
            })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( convertError )
            .then( itemIds => {
                resetPage(itemIds);
                renderItems(itemIds);
            })
            .then
            .catch( err => {
              updateStatus(errMsgs[err.error] || err.error);
            });
        }
    });
    
    addButton.addEventListener('click', () => {
        const text = newItem.value;
        const integer = newQuantity.value;

        fetch(`/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: text, quantity: integer
            })
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( convertError )
        .then( itemIds => {
            resetPage(itemIds);
            renderItems(itemIds);
        })
        .catch( err => {
            updateStatus(errMsgs[err.error] || err.error);
        });
    });

    loginButton.addEventListener('click', () => {
      const text = username.value;

      fetch(`/session`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user: text
          })
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( showListPageAfterLoading )
      .then(updateStatus(''))
      .catch( err => {
        showLoginPage();
        updateStatus(errMsgs[err.error] || err.error);
      });     
    });

    logout.addEventListener('click', () => {
      username.value = ''
      loginButton.disabled = true;
      fetch(`/session`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then(updateStatus(''))
      .then( showLoginPage )
      .catch( err => {
        updateStatus('');
    });
    });

    fetch(`/items`, {
        method: 'GET',
      })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( convertError )
        .then( itemIds => {
          renderItems(itemIds);
          updateStatus('');
        })
        .then( showListPageAfterLoading )
        .catch( err => {
          updateStatus(errMsgs[err.error] || err.error);
    });

})();

