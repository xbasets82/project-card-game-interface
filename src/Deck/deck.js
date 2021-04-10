class Deck{
    constructor(deckCards){
        this.deckCards = [];
        this.deckCards=deckCards;
    }
 showDeck= ()=>{
     for(let i = 0 ; i < this.deckCards.length; i++)
     {
         this.deckCards[i].showValue();
     }
 }
}

export default Deck;