import {
  fetchLogIn,
  fetchLogOut,
  fetchRecipes,
  fetchAddRecipes,
  fetchRecipe
  } from './services';
  
  const loginButton = document.querySelector('.main-login');
  const recipeTitle = document.querySelectorAll('.recipe-title');
  const displayRecipediv = document.querySelectorAll('.display-recipe');
  const username = document.querySelector('.username');
  const toAdd = document.querySelector('.to-add');
  const addNewRecipe = document.querySelector('.to-add-new');
  const addRecipeTitle = document.querySelector('.title');
  const addRecipeIngredients = document.querySelector('.ingredients');
  const addRecipeInstructions = document.querySelector('.instructions');
  const displayMessage = document.querySelector('.display-message');
  const logoutButton = document.querySelectorAll('.logout');
  const returnButton = document.querySelectorAll('.return');
  const loginMainPage = document.querySelector('.login');
  const status = document.querySelector('.status');
  const returnLoggedout = document.querySelector('.return-loggedout');
  
  function displayLoginPage() {
      document.getElementById('login-page').className = "";
      document.getElementById('add-recipe-page').className = "disabled";
      document.getElementById('loggedin-page').className = "disabled";
      document.getElementById('display-recipe-loggedin').className = "disabled";
      document.getElementById('display-recipe-loggedout').className = "disabled";
  }
  
  function displayHomePage() {
      document.getElementById('login-page').className = "disabled";
      document.getElementById('add-recipe-page').className = "disabled";
      document.getElementById('loggedin-page').className = "";
      document.getElementById('display-recipe-loggedin').className = "disabled";
      document.getElementById('display-recipe-loggedout').className = "disabled";
  }
  
  function displayAddRecipePage() {
      document.getElementById('add-recipe-page').className = "";
      document.getElementById('login-page').className = "disabled";
      document.getElementById('loggedin-page').className = "disabled";
      document.getElementById('display-recipe-loggedin').className = "disabled";
      document.getElementById('display-recipe-loggedout').className = "disabled";
  }
  
  function displayRecipeDetailPage(status) {
      if(status === true) {
          document.getElementById('display-recipe-loggedin').className = "";
          document.getElementById('display-recipe-loggedout').className = "disabled";
      } else {
          document.getElementById('display-recipe-loggedin').className = "disabled";
          document.getElementById('display-recipe-loggedout').className = "";
      }
      document.getElementById('add-recipe-page').className = "disabled";
      document.getElementById('loggedin-page').className = "disabled";
      document.getElementById('login-page').className = "disabled";
  }
  
  function displayFirstPage(status) {
      if(status) {
          displayHomePage();
      } else {
          displayLoginPage();
      }
  }
  
  const errMsgs = {
      "Conflict": 'That name already exists',
      'network-error': 'There was a problem connecting to the network, try again',
      'Unauthorized' : 'Enter a valid Username',
      'Bad Login': 'Not a valid input',
      'Bad request': 'All fields are mandatory'
  };
  
  function renderRecipes( recipeIds ) {
      const html = Object.keys(recipeIds).map(
        (recipeId) => `
          <li>
            <span class="title" data-id="${recipeId}">${recipeIds[recipeId].title}</span>  
            <span class="author" data-id="${recipeId}">${recipeIds[recipeId].author}</span>                   
          </li>`
      ).join('');
      for (let i = 0; i < recipeTitle.length; i++){
          recipeTitle[i].innerHTML = html;
      }
  }
  
  function displayRecipe(recipe) {
      const html = `<h1><p class="header">${recipe.title} Recipe</p></h1>
      <p class="display-title">Title: ${recipe.title}</p>
      <p class="display-author">Author: ${recipe.author}</p>
      <p class="display-ingredients">Ingredients: ${recipe.ingredients}</p>
      <p class="display-instructions">Instructions: ${recipe.instructions}</p>`
      for (let i = 0; i < displayRecipediv.length; i++){
          displayRecipediv[i].innerHTML = html;
      }
  }
  
  
  function updateStatus( message ) {
      if (typeof message !== 'undefined') {
        status.innerText = message;
      }
  }
  
  for (let i = 0; i < logoutButton.length; i++) {
      logoutButton[i].addEventListener('click', () =>{
          username.value = '';
          fetchLogOut()
          .then(updateStatus(''))
          .then( displayLoginPage )
      })
  }
  
  for (let i = 0; i < recipeTitle.length; i++) {
      recipeTitle[i].addEventListener('click', (e) => {
          e.preventDefault();
          const recipeId = e.target.dataset.id;
          if(e.target.classList.contains('title') ) { 
            fetchRecipe(recipeId)
          .then( result => {
              displayRecipeDetailPage(result.status);
              displayRecipe(result.recipe);
              updateStatus('');
          })
          .catch( err => {
              updateStatus(errMsgs[err.error] || err.error);
          });
          }
      })
  }
  
  
  loginMainPage.addEventListener('click', () => {
      resetLoginPage();
      updateStatus('');
      displayLoginPage();
  });
  
  addNewRecipe.addEventListener('click', () => {
      resetAddRecipePage();
      updateStatus('');
      displayAddRecipePage();
  });
  
  returnLoggedout.addEventListener('click', () => {
      updateStatus('');
      displayLoginPage();
  });
  
  function resetAddRecipePage() {
      addRecipeTitle.value = "";
      addRecipeIngredients.value = "";
      addRecipeInstructions.value = "";
      displayMessage.innerHTML = "";
  }
  
  function resetLoginPage() {
      username.value = "";
  }
  
  for (let i = 0; i < returnButton.length; i++) {
      returnButton[i].addEventListener('click', () => {
          resetLoginPage();
          updateStatus('');
          displayHomePage();
      })
  }
  
  toAdd.addEventListener('click', () =>{
      const addTitle = addRecipeTitle.value;
      const addAuthor = username.value;
      const addIngredients = addRecipeIngredients.value;
      const addInstructions = addRecipeInstructions.value;
      //displayAddRecipePage();
      fetchAddRecipes(addTitle, addAuthor, addIngredients, addInstructions)
      .then( recipeIds => {
          renderRecipes(recipeIds);
          updateStatus('');
      })  
      .then( message => {
          displayMessage.innerHTML = "<h3> Recipe added </h3>";
        })  
      .catch( err => {
          updateStatus(errMsgs[err.error] || err.error);
      });  
  })
  
  loginButton.addEventListener('click', () => {
      const user = username.value;
  
      fetchLogIn(user)
      .then( recipeIds => {
          renderRecipes(recipeIds);
          updateStatus('');
      })  
      .then( displayHomePage )     
      .catch( err => {
          username.value = "";
          updateStatus(errMsgs[err.error] || err.error);
      });     
  });
  
  displayLoginPage();
  
  fetchRecipes()
      .then( result => {
          displayFirstPage(result.status);
        renderRecipes(result.recipes);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
  });
  