const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const { v4: uuidv4 } = require('uuid');

app.use(cookieParser());
app.use(express.static('./public'));

const recipes = {};
const serverCookie = {};

const counter = () => {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
};

const generateRecipeId = counter();

app.post('/session', express.json(), (req, res) => {
    const username = req.body.user;
    if(username === 'dog' || /^ *$/.test(username)) {
        res.status(403).json({ error: 'Unauthorized'});
        return;
    }
    const uid = uuidv4();
    serverCookie[uid] = username;
    res.cookie('uid', uid).json(recipes);   
});

app.get('/session', (req, res) => {
    cookie = req.headers.cookie;
    let clientCookie;
    if (cookie) {
        clientCookie = cookie.replace("uid=","");
    }
    delete serverCookie[clientCookie];
    res.clearCookie('uid').json(recipes);
});

app.get('/recipes', (req, res) => {
    let clientCookie;
    let loggedIn = false;
    cookie = req.headers.cookie;

    if (!cookie) {
        return res.json({status: loggedIn, recipes: recipes});
    }

    if (cookie) {
        clientCookie = cookie.replace("uid=","");
    }

    if (!(clientCookie in serverCookie)) {
        return res.status(401)
            .json({ error: 'Unauthorized'});
    }

    loggedIn= true;
    res.json({status: loggedIn, recipes: recipes});
});

app.post('/recipes', express.json(), (req, res) => {
    cookie = req.headers.cookie;
    if (cookie) {
        clientCookie = cookie.replace("uid=","");
    }

    if(/^ *$/.test(req.body.title) || /^ *$/.test(req.body.ingredients) || /^ *$/.test(req.body.instructions)) {
        return res.status(400)
            .json({ error: 'Bad request'});
    }

    if (!(clientCookie in serverCookie)) {
        return res.status(401)
            .json({ error: 'Unauthorized'});
    }

    const recipeId = generateRecipeId();
    const username = serverCookie[clientCookie];

    const recipe = {author: username, 
        title: req.body.title, 
        ingredients: req.body.ingredients, 
        instructions: req.body.instructions};

    recipes[recipeId] = recipe;  
    res.json(recipes);
});

app.get('/recipes/:recipeId', (req, res) => {
    let clientCookie;
    cookie = req.headers.cookie;
    let loggedin = true;
    if (cookie) {
        clientCookie = cookie.replace("uid=","");
    }

    if (!(clientCookie in serverCookie)) {
        loggedin = false;
    }
    const recipeId = req.params.recipeId;
    res.json({status: loggedin, recipe: recipes[recipeId]});
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
