const PokerSuits = ["Clubs", "Diamonds", "Hearts", "Spades"];
// const SpanishSuits = ["Oros", "Copas", "Espadas", "Bastos"];

import Card from "./card.js";
import Deck from "./deck.js";

let cardValues = new Map();
let cardGameValues = new Map();
let cardGameAlternativeValues = new Map();

const createCard = (suit, value, isJoker, isVisible) =>
  new Card(
    suit,
    value,
    isJoker,
    cardValues.get(value),
    isVisible,
    cardGameValues.get(value),
    cardGameAlternativeValues.get(value)
  );

const createCards = (suit) => {
  let suitCards = [];
  for (let i = 1; i <= 13; i++) {
    suitCards.push(createCard(suit, i, false, true));
  }
  return suitCards;
};

export const createDeck = () => {
  fillCardValuesMap();
  fillCardGameValuesMap();
  fillCardGameAlteraniveValuesMap();
  let deckCards = [];
  for (let i = 0; i < PokerSuits.length; i++) {
    deckCards.push(...createCards(PokerSuits[i]));
  }
  let deck = new Deck(deckCards);
  return deck;
};

const fillCardValuesMap = () => {
  cardValues.set(1, "Ace");
  cardValues.set(2, "2");
  cardValues.set(3, "3");
  cardValues.set(4, "4");
  cardValues.set(5, "5");
  cardValues.set(6, "6");
  cardValues.set(7, "7");
  cardValues.set(8, "8");
  cardValues.set(9, "9");
  cardValues.set(10, "10");
  cardValues.set(11, "Jack");
  cardValues.set(12, "Queen");
  cardValues.set(13, "King");
};

const fillCardGameValuesMap = () => {
  cardGameValues.set(1, 11);
  cardGameValues.set(2, 2);
  cardGameValues.set(3, 3);
  cardGameValues.set(4, 4);
  cardGameValues.set(5, 5);
  cardGameValues.set(6, 6);
  cardGameValues.set(7, 7);
  cardGameValues.set(8, 8);
  cardGameValues.set(9, 9);
  cardGameValues.set(10, 10);
  cardGameValues.set(11, 10);
  cardGameValues.set(12, 10);
  cardGameValues.set(13, 10);
};

const fillCardGameAlteraniveValuesMap = () => {
  cardGameAlternativeValues.set(1, 1);
};
