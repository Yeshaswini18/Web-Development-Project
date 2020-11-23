const wordList = require('./words')
const playerMap = {};

function generateGameId() {
	const gameId = Math.floor(Math.random() * wordList.length); // generate game id
	const playerInfo = { // pick a word for an id
	  	word: process.env.OVERRIDE || pickWord(gameId, wordList),
	  	turns: 0,
	  	messages: []
	};
	// store the word in the player list to retrieve later
	playerMap[gameId] = playerInfo;
	return gameId;
}

function getWordList() {
	const wordMap = {};
	for (let index = 0; index < wordList.length; index++) {
		wordMap[index] = wordList[index];
	}
	return wordMap;
}

function pickWord(gameId, wordList) {
  	console.log("The word is: ", wordList[gameId], "and the game Id is: ", gameId);
  	return wordList[gameId];
}

function getWordForPlayer(gameId) {
	playerInfo = playerMap[gameId];
	return playerInfo.word;
}

function getTurnsForPlayer(gameId) {
	playerInfo = playerMap[gameId];
	return playerInfo.turns;
}

function getMessagesForPlayer(gameId) {
	playerInfo = playerMap[gameId];
	return playerInfo.messages;
}

function addMessage(gameId, guess, result, state) {
	playerInfo = playerMap[gameId];
	playerInfo.messages.push({ guess, result, state });
}

function clearMessages() {
  	displayMessages.length = 0;
}

function processTurn(gameId, guess) {
	const word = playerMap[gameId].word;
  	result = {"body": "", state: ""};

  	if ((guess.length !== word.length) || !(/^[a-zA-Z]+$/.test(guess))) { // not match length OR guess has non alpha char
  		result.body = "This is not a valid word!!! Enter again:(";
  		result.state = "invalid";
    	return result;
  	}

	incrementTurn(gameId);

	if (exactMatch(word, guess)) {
		result.body = "CORRECT!  You won in " + playerMap[gameId].turns + " turns";
		result.state = "correct";
		return result;
	}

	const match = compare(word, guess);
	result.body = "You matched " + match + " letters out of " + word.length;
	result.state = "valid";
	return result;
}

function incrementTurn(gameId) {
	playerMap[gameId].turns++; // increment the turn
}

function exactMatch(word, guess) {
  return word.toUpperCase() === guess.toUpperCase(); // Case-insensitive compare
}

function compare(word, guess) { 
	let count = 0;
	const wordCaseInsensitive = word.toLowerCase();
	const guessCaseInsensitive = guess.toLowerCase();
	let wordList = {};
	for (const letter of wordCaseInsensitive) 
		if (!wordList[letter])
	  		wordList[letter] = 1;
		else 
	  		wordList[letter] = wordList[letter] + 1;
		for (const letter of guessCaseInsensitive){
		if (wordList[letter] > 0){
	  		count ++;
	  		wordList[letter]--;
	  	}
		}
		return count;
}

const game = {
	generateGameId,
	pickWord,
	getWordForPlayer,
	getTurnsForPlayer,
	getMessagesForPlayer,
	addMessage,
	clearMessages,
	processTurn,
	getWordList
};

module.exports = game;
