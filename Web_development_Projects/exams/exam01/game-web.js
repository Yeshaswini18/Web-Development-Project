const gameWeb = {
	gamePage: function(game, gameId) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/style.css"/>
          <title>Game Page</title>
        </head>
        <body>
          <div id="word-game" class="display-panel">
            <div class="headers">
              <h1>Guess the word?</h1>
              <h2>The word is ${game.getWordForPlayer(gameId).length} letters</h2>
            </div>
            ${gameWeb.getWordList(game)}
            ${gameWeb.getPlayerInput(gameId)}
            ${gameWeb.getMessageList(game, gameId)}
          </div>
        </body>
      </html>
  `;
  },
  endGame: function(game, gameId) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/style.css"/>
          <title>Game Page</title>
        </head>
        <body>
          <div id="end-game">
              <h2> You've won the game! Number of turns taken: ${game.getTurnsForPlayer(gameId)} !! </h2>
              <div class="display-panel">
                ${gameWeb.getMessageList(game, gameId)}
                ${gameWeb.startNewGame()}
              </div>
          </div>
        </body>
      </html>
  `;
  },
  getMessageList: function(game, gameId) {
    return `<ol class="result-list">` +
      game.getMessagesForPlayer(gameId).map( message => `
        <li>
          <div class="${message.state}">
            <div class="display-guess">
              <span class = "guess">Your Guess: ${message.guess}</span>
            </div>
            <div class="display-result">
              <span class = "result">Result: ${message.result}</span> 
            </div>
          </div>
        </li>
      `).join('') +
      `</ol>`;
  },
  getWordList: function(game) {
    return `<h2 class="valid-words">Valid words for guessing</h2>
    <ul class="words">` +
    Object.values(game.getWordList()).map( word => `
      <li>
        <div class="word">
          <span class="username">${word}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getPlayerInput: function(gameId) {
    return `
      <div class="guessed-word">
        <form action="/guess" method="POST">
          <label>Player's guess: <input type="text" name=${gameId} value="" placeholder="enter your guess here"/></label>
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
  },
  startNewGame: function() {
    return `
      <div class="new-game">
        <form action="/" method="GET">
          <button type="submit">Start a new game!</button>
        </form>
      </div>
    `;
  }
};

module.exports = gameWeb;
