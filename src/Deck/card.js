class Card {
  constructor(
    suit,
    numValue,
    isJoker,
    litValue,
    isVisible,
    gameValue,
    gameAlternativeValue
  ) {
    this.suit = suit;
    this.numValue = numValue;
    this.litValue = litValue;
    this.isJoker = isJoker;
    this.privateIsVisible = isVisible;
    this.privateGameValue = gameValue;
    this.privateGameAlternativeValue = gameAlternativeValue;
  }
  showValue = () => {
    switch (this.gameAlternativeValue) {
      case undefined:
        console.log(
          `${this.litValue} of ${this.suit} value : ${this.gameValue}`
        );
        break;
      default:
        console.log(
          `${this.litValue} of ${this.suit} value : ${this.gameValue} or ${this.gameAlternativeValue} `
        );
        break;
    }
  };
  get isVisible() {
    return this.privateIsVisible;
  }
  set isVisible(newIsVisible) {
    this.privateIsVisible = newIsVisible;
  }
  get gameValue() {
      return this.privateGameValue;
  }
set gameValue(newGameValue){
    this.privateGameValue = newGameValue;
}
get gameAlternativeValue(){
    return this.privateGameAlternativeValue;
}
set gameAlternativeValue(newGameAlternativeValue){
    this.privateGameAlternativeValue =newGameAlternativeValue;
}


  
}
export default Card;
