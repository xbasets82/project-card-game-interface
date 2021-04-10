import Player from "./player.js";

class Crupier extends Player{
    constructor(name,order,color,isCrupier){
        super(name,order,color);
        this.isCrupier = isCrupier;
    }
}

export default Crupier;