import Game from "./game.js";
import Rules from "./rules.js";

const actions = [
  { action: "C", function: (game) => game.giveCard(true) },
  { action: "P", function: (game) => game.pass() },
];

let game;
let players = [];
let crupier;

export const validateTopCrupier = (crupier) => {
  if (crupier.hand.getHandValue() <= 16) {
    return true;
  } else {
    return false;
  }
};

export const replaceCardValue = (player) => {
  for (let i = 0; i < player.hand.cards.length; i++) {
    if (
      player.hand.cards[i].gameAlternativeValue !== undefined &&
      player.hand.cards[i].gameAlternativeValue < player.hand.cards[i].gameValue
    ) {
      player.hand.cards[i].gameValue =
        player.hand.cards[i].gameAlternativeValue;
      player.hand.cards[i].gameAlternativeValue = undefined;
      break;
    }
  }
};

const reviewHandValue = (currentTurn, players) => {
  replaceCardValue(players[currentTurn]);
  return validateHand(currentTurn, players);
};

export const controlSpecialCases = (currentTurn, players) => {
  if (players[currentTurn].hand.hasHandSpecialValues()) {
    return reviewHandValue(currentTurn, players);
  } else {
    return false;
  }
};

export const validateHand = (currentTurn, players) => {
  switch (true) {
    case players[currentTurn].hand.getHandValue() > 21:
      return false;
      // controlSpecialCases(currentTurn);
      break;
    default:
      return true;
      break;
  }
};

export const findAction = (action) => {
  return actions.find((Element) => Element.action === action);
};
export const excuteAction = (actionToExecute, game) => {
  return actionToExecute.function(game);
};

const processToDo = (isCrupier) =>
  isCrupier === false ? playerTurn() : crupierTurn();

export const askForOptions = () => [
  { key: "C", action: "Card" },
  { key: "P", action: "Stand" },
  { key: "X", action: "Quit game" },
];

export const compareResults = (crupier, players) => {
  console.log(`Crupier cards value : ${crupier.hand.getHandValue()}`);
  let crupierPoints = crupier.hand.getHandValue();
  let results = [];
  for (let i = 0; i < players.length; i++) {
    let playerPoints = players[i].hand.getHandValue();
    console.log(
      `cards value ${players[i].name} : ${players[i].hand.getHandValue()}`
    );
    if (
      playerPoints === 21 ||
      (playerPoints > crupierPoints && playerPoints < 21) ||
      (crupierPoints > 21 && playerPoints <= 21)
    ) {
      results.push({ player: i, result: "W" });
      console.log("WIN");
    } else if (playerPoints === crupierPoints && playerPoints <= 21) {
      results.push({ player: i, result: "D" });
      console.log("DEUCE");
    } else {
      results.push({ player: i, result: "L" });
      console.log("LOSE");
    }
  }
  return results;
};

export const gameProcess = (
  gamePlayers,
  gameCrupier,
  actualGame,
  isCrupier
) => {
  game = actualGame;
  crupier = gameCrupier;
  players = gamePlayers;
  console.log("-------------------------");
  isCrupier === false ? playerTurn() : crupierTurn();
};

export const giveInitialCards = (game) => game.giveInitialCards();

export const giveCrupierInitialCards = (game) => game.giveCrupierInitialCards();

export const giveCard = (game, isVisible) => game.giveCard(isVisible);

export const removeCard = () => "";

export const getGameRules = (game) => new Rules(2, 1);

export const getGame = (deck) => new Game(deck);
//cal fer obtenció de les rules d'algun fitxer
