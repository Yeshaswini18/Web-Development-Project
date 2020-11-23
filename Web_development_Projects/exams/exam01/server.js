
const express = require('express');
const app = express();
const PORT = 3000;

const gameWeb = require('./game-web');
const game = require('./game');

app.use(express.static('./public'));

app.get('/', (req,res) => {
	const gameId = game.generateGameId();
	res.send(gameWeb.gamePage(game, gameId));
});

app.get('/game', (req,res) => {
	res.send(gameWeb.gamePage(game, gameId));
});

app.get('/end', (req,res) => {
	res.send(gameWeb.endGame(game, gameId));
});

app.post('/guess', express.urlencoded({ extended: true }), (req, res) => {
	const reqBody = JSON.parse(JSON.stringify(req.body));

	const id = Object.keys(reqBody)[0]; // get game id from request
	const guess = reqBody[id];

	// gameId is of int type in game.js, so parse it as int
	gameId = parseInt(id);

	const result = game.processTurn(gameId, guess);
	game.addMessage(gameId, guess, result.body, result.state);

	if (result.state === "correct") {
		res.redirect('/end');
	} else {
		res.redirect('/game');
	}
});

const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));