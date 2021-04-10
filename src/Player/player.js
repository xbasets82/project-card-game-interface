class Player {
  constructor(name, order, color) {
    this.privateName = name;
    this.privateOrder = order;
    this.privateColor = color;
    
  }
  identify = () =>
    console.log(
      `${this.privateName} is player number ${this.privateOrder}, color ${this.privateColor}`
    );
  showName = () =>  console.log(`${this.privateName} :`);
   get name() {return this.privateName}
   set name(newName) {this.privateName = newName} 
   get order() {return this.privateOrder}
   set order(newOrder) {this.privateOrder = newOrder} 
   get color() {return this.privateColor}
   set color(newColor) {this.privateColor = newColor}   
}

export default Player;
