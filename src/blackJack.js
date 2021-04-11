import { createPlayer, createCrupier, newHand } from 'player/mainPlayer.mjs';
import {
  giveInitialCards,
  getGame,
  giveCrupierInitialCards,
  getGameRules,
  askForOptions,
  findAction,
  excuteAction,
  validateHand,
  controlSpecialCases,
  compareResults,
  validateTopCrupier,
  replaceCardValue,
} from 'game/mainGame.mjs';
import { createDeck } from 'deck/mainDeck.mjs';
import { doc } from 'prettier';

let deck;
let game;
let playerOrder = 1;
let players = [];
let crupier;
let cardsImages = new Map();

function showCrupierCards() {
  let crupierDiv = document.querySelector('#CrupierCards');
  crupierDiv.innerHTML = '';
  for (let i = 0; i < crupier.hand.cards.length; i++) {
    let card = document.createElement('img');
    card.src = cardsImages.get(
      crupier.hand.cards[i].litValue + crupier.hand.cards[i].suit.charAt(0),
    );
    card.classList.add('card');
    crupierDiv.appendChild(card);
  }
}

const crupierTurn = () => {
  crupier.hand.printHand();
  if (validateTopCrupier(crupier)) {
    crupier.hand.cards.push(game.giveCard(game, true));
    showCrupierCards();
    crupierTurn();
  } else {
    if (crupier.hand.hasHandSpecialValues()) {
      replaceCardValue(crupier);
      crupierTurn();
    } else {
      console.log('crupier hand:');
      crupier.hand.printHand();
      showCrupierCards();
      let results = compareResults(crupier, players);
      console.log(results);
    }
  }
};

const playerTurns = () => {
  console.log(`${players[game.playerTurn].name} : `);
  showPlayerCards();
  enablePlayer();
};

const gameProcess = (isCrupier) => {
  console.log('-------------------------');
  isCrupier === false ? playerTurns() : crupierTurn();
};

const enablePlayer = () => {
  let divToEnable = document.querySelector(
    `#cards${players[game.playerTurn].name}`,
  );
  divToEnable.classList.add('enabled');
};

const setNextTurn = () => {
  if (game.playerTurn === players.length - 1) {
    gameProcess(true);
  } else {
    game.nextPlayerTurn();
    gameProcess(false);
  }
};

const moreThan21 = (currentTurn) => {
  console.log(`El jugador ${players[currentTurn].name} se ha pasado`);
  showPlayerCards();
};

const noMoreCards = (currentTurn) => {
  console.log(`El jugador ${players[currentTurn].name} se planta`);
};

const validateTurn = (playerIndex, result) => {
  if (playerIndex === game.playerTurn) {
    players[game.playerTurn].hand.cards.push(result);
    let handResult = validateHand(playerIndex, players);
    if (handResult === true) {
      gameProcess(false);
    } else {
      let validateCase = controlSpecialCases(playerIndex, players);
      if (validateCase === true) {
        gameProcess(false);
      } else {
        moreThan21(playerIndex);
        setNextTurn(playerIndex);
      }
    }
  } else if (game.playerTurn >= players.length) {
    noMoreCards(playerIndex);
    gameProcess(true);
  } else {
    noMoreCards(playerIndex);
    gameProcess(false);
  }
};

function processOption(playerIndex, key) {
  let action = findAction(key);
  if (action !== undefined) {
    let resultAction = excuteAction(action, game);
    validateTurn(playerIndex, resultAction);
  } else {
    console.log(`invalid Action!`);
  }
}

function showPlayerCards() {
  let playersCardsDiv = document.querySelector('#PlayersCards');
  playersCardsDiv.innerHTML = '';
  for (let i = 0; i < players.length; i++) {
    let playerDiv = document.createElement('div');
    playerDiv.setAttribute('id', `cards${players[i].name}`);
    let playerOptionsDiv = document.createElement('div');
    for (let j = 0; j < players[i].hand.cards.length; j++) {
      let card = document.createElement('img');
      card.src = cardsImages.get(
        players[i].hand.cards[j].litValue +
          players[i].hand.cards[j].suit.charAt(0),
      );
      card.classList.add('card');
      playerDiv.appendChild(card);
    }
    playersCardsDiv.appendChild(playerDiv);
    let options = askForOptions();
    playerOptionsDiv.classList.add('fColumn');
    playerOptionsDiv.setAttribute('id', `options${players[i].name}`);
    for (let k = 0; k < options.length; k++) {
      let option = document.createElement('button');
      option.value = options[k].action;
      option.textContent = options[k].action;
      option.addEventListener('click', function (event) {
        processOption(i, options[k].key);
      });
      playerOptionsDiv.appendChild(option);
    }
    playersCardsDiv.appendChild(playerOptionsDiv);
  }
}

function showCards() {
  showCrupierCards();
  showPlayerCards();
}

const getPlayers = () => {
  players = [];
  let playersTable = document.querySelector('tbody');
  let numberOfPlayers = playersTable.rows.length;
  for (let i = 0; i < numberOfPlayers; i++) {
    players.push(
      createPlayer(
        playersTable.rows[i].cells[2].innerText,
        playersTable.rows[i].cells[3].innerText,
        playersTable.rows[i].cells[1].innerText,
      ),
    );
  }
};

const getCrupier = () =>
  (crupier = createCrupier('Crupier', 'black', players.length + 1, true));

const getNewGame = () => (game = getGame(deck));

const getRules = () => (game.rules = getGameRules(game));

const getPlayersCards = () => {
  for (let i = 0; i < players.length; i++) {
    players[i].hand = newHand(giveInitialCards(game));
    console.log(`${players[i].name} cards:`);
    players[i].hand.printHand();
  }
};

const getCrupierCards = () => {
  crupier.hand = newHand(giveCrupierInitialCards(game));
  console.log(`${crupier.name} cards:`);
  crupier.hand.printHand();
};

const getInitialCards = () => {
  getPlayersCards();
  getCrupierCards();
};

const startGame = () => {
  if (validateMinPlayer()) {
    deck = createDeck();
    getPlayers();
    getCrupier();
    getNewGame();
    getRules();
    getInitialCards();
    showCards();
    enablePlayer();
  } else {
    alert('no players to play');
  }
};

const validateMinPlayer = () => {
  const tbody = document.querySelector('tbody');
  return tbody.rows.length < 2 ? false : true;
};

const createTextTd = (text, isVisible) => {
  let td = document.createElement('td');
  if (!isVisible) {
    td.setAttribute('style', 'display:none');
  }
  let tdText;
  tdText = document.createTextNode(text);
  td.appendChild(tdText);
  return td;
};

const deleteRow = (index) => {
  const tbody = document.querySelector('tbody');
  let row = tbody.deleteRow(index);
  if (tbody.rows.length < 4) {
    let button = document.querySelector('#addIcon');
    button.setAttribute('disabled', 'false');
    button.setAttribute('src', '/dist/svg/img/plus.svg');
  }
};

const createImg = (index) => {
  let img = document.createElement('img');
  img.setAttribute('src', '/dist/svg/img/minus.png');
  img.classList.add('tableIcon');
  img.addEventListener('click', function (event) {
    deleteRow(index);
  });
  return img;
};

function createRow() {
  let row = document.createElement('tr');
  let td = document.createElement('td');
  row.appendChild(createTextTd(playerOrder, false));
  td = document.createElement('td');
  td.classList.add('deleteButtonCell');
  td.appendChild(createImg(playerOrder));
  row.appendChild(td);
  const name = document.querySelector('#newPlayer');
  row.appendChild(createTextTd(name.value, true));
  name.value = '';
  td = document.createElement('td');
  const color = document.querySelector('#playerColor');
  td.style.backgroundColor = color.value;
  row.appendChild(td);
  playerOrder = playerOrder + 1;
  return row;
}

const isNameEmpty = () => {
  const name = document.querySelector('#newPlayer');
  if (name.value === '') {
    return true;
  } else {
    return false;
  }
};

const existsSamePlayerName = () => {
  let playersTable = document.querySelector('tbody');
  let numberOfPlayers = playersTable.rows.length;
  const name = document.querySelector('#newPlayer');
  for (let i = 0; i < numberOfPlayers; i++) {
    if (name.value === playersTable.rows[i].cells[2].innerText) {
      return true;
    }
    //  playersTable.rows[i].cells[3].innerText;
  }
  return false;
};


const ToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

function rgbToHex(color) {
  let rgb = color.replace("(","").replace(")","").replace("rgb","").split(",");
  return "#" + ToHex(rgb[0]) + ToHex(rgb[1]) + ToHex(rgb[2]);
}


const existsSamePlayerColor = () => {
  let playersTable = document.querySelector('tbody');
  let numberOfPlayers = playersTable.rows.length;
  const color = document.querySelector('#playerColor');

  for (let i = 0; i < numberOfPlayers; i++) {
    let cell = playersTable.rows[i].cells[3];
    const style = getComputedStyle(cell);
    const bgColor = style.backgroundColor;
    let convertedColor = rgbToHex(bgColor);
    if (color.value === convertedColor) {
      return true;
    }
  }
  return false;
};

function addNewPlayer(button) {
  const tbody = document.querySelector('tbody');

  switch (true) {
    case tbody.rows.length === 4:
      const name = document.querySelector('#newPlayer');
      name.value = '';
      break;
    case isNameEmpty():
      alert('Name cannot be empty');
      break;
    case existsSamePlayerName():
      alert('There is already a player with that name');
      break;
    case existsSamePlayerColor():
      alert('There is already a player with that color');
      break;
    default:
      tbody.appendChild(createRow());
      break;
  }


  if (tbody.rows.length === 4) {
    button.setAttribute('disabled', 'true');
    button.setAttribute('src', '/dist/svg/img/cancel.svg');
  }
}

function addEventPlayer() {
  const addPlayer = document.querySelector('.tableIcon');
  addPlayer.addEventListener('click', function (event) {
    event.preventDefault(this);
    addNewPlayer(this);
  });
}

const addEventStartGame = () => {
  const startButton = document.querySelector('.startImage');
  startButton.addEventListener('click', function (event) {
    startGame();
  });
};

document.addEventListener('DOMContentLoaded', function (event) {
  addEventPlayer();
  addEventStartGame();
});

const fillCardGameValuesMap = () => {
  cardsImages.set('AceC', '/dist/svg/cards/AC.svg');
  cardsImages.set('2C', '/dist/svg/cards/2C.svg');
  cardsImages.set('3C', '/dist/svg/cards/3C.svg');
  cardsImages.set('4C', '/dist/svg/cards/4C.svg');
  cardsImages.set('5C', '/dist/svg/cards/5C.svg');
  cardsImages.set('6C', '/dist/svg/cards/6C.svg');
  cardsImages.set('7C', '/dist/svg/cards/7C.svg');
  cardsImages.set('8C', '/dist/svg/cards/8C.svg');
  cardsImages.set('9C', '/dist/svg/cards/9C.svg');
  cardsImages.set('10C', '/dist/svg/cards/10C.svg');
  cardsImages.set('JackC', '/dist/svg/cards/JC.svg');
  cardsImages.set('QueenC', '/dist/svg/cards/QC.svg');
  cardsImages.set('KingC', '/dist/svg/cards/KC.svg');
  cardsImages.set('AceD', '/dist/svg/cards/AD.svg');
  cardsImages.set('2D', '/dist/svg/cards/2D.svg');
  cardsImages.set('3D', '/dist/svg/cards/3D.svg');
  cardsImages.set('4D', '/dist/svg/cards/4D.svg');
  cardsImages.set('5D', '/dist/svg/cards/5D.svg');
  cardsImages.set('6D', '/dist/svg/cards/6D.svg');
  cardsImages.set('7D', '/dist/svg/cards/7D.svg');
  cardsImages.set('8D', '/dist/svg/cards/8D.svg');
  cardsImages.set('9D', '/dist/svg/cards/9D.svg');
  cardsImages.set('10D', '/dist/svg/cards/10D.svg');
  cardsImages.set('JackD', '/dist/svg/cards/JD.svg');
  cardsImages.set('QueenD', '/dist/svg/cards/QD.svg');
  cardsImages.set('KingD', '/dist/svg/cards/KD.svg');
  cardsImages.set('AceH', '/dist/svg/cards/AH.svg');
  cardsImages.set('2H', '/dist/svg/cards/2H.svg');
  cardsImages.set('3H', '/dist/svg/cards/3H.svg');
  cardsImages.set('4H', '/dist/svg/cards/4H.svg');
  cardsImages.set('5H', '/dist/svg/cards/5H.svg');
  cardsImages.set('6H', '/dist/svg/cards/6H.svg');
  cardsImages.set('7H', '/dist/svg/cards/7H.svg');
  cardsImages.set('8H', '/dist/svg/cards/8H.svg');
  cardsImages.set('9H', '/dist/svg/cards/9H.svg');
  cardsImages.set('10H', '/dist/svg/cards/10H.svg');
  cardsImages.set('JackH', '/dist/svg/cards/JH.svg');
  cardsImages.set('QueenH', '/dist/svg/cards/QH.svg');
  cardsImages.set('KingH', '/dist/svg/cards/KH.svg');
  cardsImages.set('AceS', '/dist/svg/cards/AS.svg');
  cardsImages.set('2S', '/dist/svg/cards/2S.svg');
  cardsImages.set('3S', '/dist/svg/cards/3S.svg');
  cardsImages.set('4S', '/dist/svg/cards/4S.svg');
  cardsImages.set('5S', '/dist/svg/cards/5S.svg');
  cardsImages.set('6S', '/dist/svg/cards/6S.svg');
  cardsImages.set('7S', '/dist/svg/cards/7S.svg');
  cardsImages.set('8S', '/dist/svg/cards/8S.svg');
  cardsImages.set('9S', '/dist/svg/cards/9S.svg');
  cardsImages.set('10S', '/dist/svg/cards/10S.svg');
  cardsImages.set('JackS', '/dist/svg/cards/JS.svg');
  cardsImages.set('QueenS', '/dist/svg/cards/QS.svg');
  cardsImages.set('KingS', '/dist/svg/cards/KS.svg');
};

fillCardGameValuesMap();
