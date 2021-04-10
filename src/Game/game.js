class Game {
  constructor(deck, rules) {
    this.deckCards = deck.deckCards;
    this.privateRules = rules;
    this.privateGameEnded = false;
    this.privatePlayerTurn = 0;
  }
  giveInitialCards() {
    let cards = [];
    for (let i = 0; i < this.privateRules.initialNumberCards; i++) {
      let index = Math.floor(Math.random() * this.deckCards.length);
      cards.push(this.deckCards[index]);
      this.deckCards.splice(index, 1);
    }
    return cards;
  }
  giveCrupierInitialCards() {
    let cards = [];
    for (let i = 0; i < this.privateRules.initialCrupierNumberCards; i++) {
      let index = Math.floor(Math.random() * this.deckCards.length);
      cards.push(this.deckCards[index]);
      this.deckCards.splice(index, 1);
    }
    return cards;
  }
  giveCard(isVisible) {
    let card;
    let index = Math.floor(Math.random() * this.deckCards.length);
    card = this.deckCards[index];
    this.deckCards.splice(index, 1);
    return card;
  }
  pass() {
    this.privatePlayerTurn = this.privatePlayerTurn + 1;
  }
  nextPlayerTurn() {
    this.privatePlayerTurn = this.privatePlayerTurn + 1;
  }
  get rules() {
    return this.privateRules;
  }
  set rules(newRules) {
    this.privateRules = newRules;
  }
  get gameEnded() {
    return this.privateGameEnded;
  }
  set gameEnded(newGameEnded) {
    this.privateGameEnded = newGameEnded;
  }
  get playerTurn() {
    return this.privatePlayerTurn;
  }
  set playerTurn(newPlayerTurn) {
    this.privatePlayerTurn = newPlayerTurn;
  }
}
export default Game;
