import Player from "./player.js";
import CardsPlayer from "./cardsPlayer.js"
import Hand from "./hand.js";
import Crupier from "./crupier.js";


export const createPlayer = (name, color, order) => {
  let player = new Player(name, order, color);
  player.identify();
  return player;
};

export const createCardsPlayer = (name, color, order) => {
  let cardsPlayer = new CardsPlayer(name, order, color);
  CardsPlayer.identify();
  return cardsPlayer;
};

export const createCrupier = (name,color,order,isCrupier) =>{
  let crupier = new Crupier(name, order, color, isCrupier);
  return crupier;
};

export const newHand = (cards) =>{
  let hand = new Hand(cards);
  return hand;
};

export const updateHand = (cards) =>{
  let hand = new Hand(cards);
  return hand;
};