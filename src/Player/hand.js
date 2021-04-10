class Hand {
  constructor(cards) {
    this.cards = cards;
    this.cardsGameValue = 0;
  }
  printHand = () => {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].showValue();
    };
    let handValue = this.getHandValue();
    console.log(`Total : ${handValue}`)
  };
  getHandValue = () => {
    let updatedGameValue = 0;  
    for (let i = 0; i < this.cards.length; i++) {
        updatedGameValue = updatedGameValue + this.cards[i].gameValue;
    };
    this.cardsGameValue = updatedGameValue;
    return this.cardsGameValue;
  };
  hasHandSpecialValues = () => 
   (this.cards.filter((card) => card.gameAlternativeValue !== undefined).length > 0) ? true : false ;
  
}
export default Hand;
