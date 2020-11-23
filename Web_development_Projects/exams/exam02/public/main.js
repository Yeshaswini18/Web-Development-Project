/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recipes.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/recipes.js":
/*!************************!*\
  !*** ./src/recipes.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var loginButton = document.querySelector('.main-login');
var recipeTitle = document.querySelectorAll('.recipe-title');
var displayRecipediv = document.querySelectorAll('.display-recipe');
var username = document.querySelector('.username');
var toAdd = document.querySelector('.to-add');
var addNewRecipe = document.querySelector('.to-add-new');
var addRecipeTitle = document.querySelector('.title');
var addRecipeIngredients = document.querySelector('.ingredients');
var addRecipeInstructions = document.querySelector('.instructions');
var displayMessage = document.querySelector('.display-message');
var logoutButton = document.querySelectorAll('.logout');
var returnButton = document.querySelectorAll('.return');
var loginMainPage = document.querySelector('.login');
var status = document.querySelector('.status');
var returnLoggedout = document.querySelector('.return-loggedout');

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
  if (status === true) {
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
  if (status) {
    displayHomePage();
  } else {
    displayLoginPage();
  }
}

var errMsgs = {
  "Conflict": 'That name already exists',
  'network-error': 'There was a problem connecting to the network, try again',
  'Unauthorized': 'Enter a valid Username',
  'Bad Login': 'Not a valid input',
  'Bad request': 'All fields are mandatory'
};

function renderRecipes(recipeIds) {
  var html = Object.keys(recipeIds).map(function (recipeId) {
    return "\n          <li>\n            <span class=\"title\" data-id=\"".concat(recipeId, "\">").concat(recipeIds[recipeId].title, "</span>  \n            <span class=\"author\" data-id=\"").concat(recipeId, "\">").concat(recipeIds[recipeId].author, "</span>                   \n          </li>");
  }).join('');

  for (var i = 0; i < recipeTitle.length; i++) {
    recipeTitle[i].innerHTML = html;
  }
}

function displayRecipe(recipe) {
  var html = "<h1><p class=\"header\">".concat(recipe.title, " Recipe</p></h1>\n      <p class=\"display-title\">Title: ").concat(recipe.title, "</p>\n      <p class=\"display-author\">Author: ").concat(recipe.author, "</p>\n      <p class=\"display-ingredients\">Ingredients: ").concat(recipe.ingredients, "</p>\n      <p class=\"display-instructions\">Instructions: ").concat(recipe.instructions, "</p>");

  for (var i = 0; i < displayRecipediv.length; i++) {
    displayRecipediv[i].innerHTML = html;
  }
}

function updateStatus(message) {
  if (typeof message !== 'undefined') {
    status.innerText = message;
  }
}

for (var i = 0; i < logoutButton.length; i++) {
  logoutButton[i].addEventListener('click', function () {
    username.value = '';
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogOut"])().then(updateStatus('')).then(displayLoginPage);
  });
}

for (var _i = 0; _i < recipeTitle.length; _i++) {
  recipeTitle[_i].addEventListener('click', function (e) {
    e.preventDefault();
    var recipeId = e.target.dataset.id;

    if (e.target.classList.contains('title')) {
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipe"])(recipeId).then(function (result) {
        displayRecipeDetailPage(result.status);
        displayRecipe(result.recipe);
        updateStatus('');
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });
}

loginMainPage.addEventListener('click', function () {
  resetLoginPage();
  updateStatus('');
  displayLoginPage();
});
addNewRecipe.addEventListener('click', function () {
  resetAddRecipePage();
  updateStatus('');
  displayAddRecipePage();
});
returnLoggedout.addEventListener('click', function () {
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

for (var _i2 = 0; _i2 < returnButton.length; _i2++) {
  returnButton[_i2].addEventListener('click', function () {
    resetLoginPage();
    updateStatus('');
    displayHomePage();
  });
}

toAdd.addEventListener('click', function () {
  var addTitle = addRecipeTitle.value;
  var addAuthor = username.value;
  var addIngredients = addRecipeIngredients.value;
  var addInstructions = addRecipeInstructions.value; //displayAddRecipePage();

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchAddRecipes"])(addTitle, addAuthor, addIngredients, addInstructions).then(function (recipeIds) {
    renderRecipes(recipeIds);
    updateStatus('');
  }).then(function (message) {
    displayMessage.innerHTML = "<h3> Recipe added </h3>";
  })["catch"](function (err) {
    updateStatus(errMsgs[err.error] || err.error);
  });
});
loginButton.addEventListener('click', function () {
  var user = username.value;
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogIn"])(user).then(function (recipeIds) {
    renderRecipes(recipeIds);
    updateStatus('');
  }).then(displayHomePage)["catch"](function (err) {
    username.value = "";
    updateStatus(errMsgs[err.error] || err.error);
  });
});
displayLoginPage();
Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipes"])().then(function (result) {
  displayFirstPage(result.status);
  renderRecipes(result.recipes);
  updateStatus('');
})["catch"](function (err) {
  updateStatus(errMsgs[err.error] || err.error);
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogIn, fetchLogOut, fetchRecipes, fetchAddRecipes, fetchRecipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogIn", function() { return fetchLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogOut", function() { return fetchLogOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipes", function() { return fetchRecipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAddRecipes", function() { return fetchAddRecipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipe", function() { return fetchRecipe; });
var fetchLogIn = function fetchLogIn(username) {
  return fetch("/session", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: username
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var fetchLogOut = function fetchLogOut() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var fetchRecipes = function fetchRecipes() {
  return fetch('/recipes', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var fetchAddRecipes = function fetchAddRecipes(addTitle, addAuthor, addIngredients, addInstructions) {
  return fetch('/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: addTitle,
      author: addAuthor,
      ingredients: addIngredients,
      instructions: addInstructions
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var fetchRecipe = function fetchRecipe(recipeId) {
  return fetch("/recipes/".concat(recipeId), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

/***/ })

/******/ });
//# sourceMappingURL=main.js.map