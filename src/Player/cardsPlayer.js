import Player from "./player.js";

class CardsPlayer extends Player {
  constructor(name, order, color) {
    super(name, order, color);
    this.privateHand;
  }
  get hand() {return this.privateHand}
   set hand(newHand) {this.privateHand = newHand}
}

export  default CardsPlayer;