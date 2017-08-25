// var Cat = (function(){
//   return {
//     coordinates: [],
//     lives:
//     //lives
//     //points
//     //move fn (keypress)
//     //isHit
//   }
// })();
function Cat(posX, posY,width,height) {
  this.posX = posX-5;
  this.posY = posY;
  this.width = width-5;
  this.height = height-5;
  this.bounds = [];
  this.won = false;
  this.img = ["images/Pasty_Sprite_Front.png","images/Bolt_Sprite.png","images/Cocoa_Sprite.png","images/Gabriel_Sprite.png","images/Ginger_Sprite.png","images/Melange_Sprite.png","images/Pickles_Sprite.png","images/Sunny_Sprite.png","images/Speckles_Sprite.png","images/Macchiato_Sprite.png","images/Mack_Sprite.png"];
  this.setBounds = function(top,left,bottom,right) {
    this.bounds = [top,left,bottom,right];
  }
  this.move = function(dir) {
    var left = this.bounds[1]+this.width;
    var top = this.bounds[0]+this.height;
    var bottom = this.bounds[2]-this.height-10;
    var right = this.bounds[3]-this.width;
    console.log('move');
    switch(dir) {
      case 'up':
      if(this.posY >= top) {
        this.posY = this.posY-this.height-5;
        console.log('here');
      }
      break;
      case 'down':
      if(this.posY <= bottom) {
        this.posY = this.posY+this.height+5;
      }
      break;
      case 'left':
      if(this.posX >= left) {
        this.posX = this.posX-this.width-5;
      }
      break;
      case 'right':
      if(this.posX <= right) {
        this.posX = this.posX+this.width+5;
      }
      break;
    }
  };
  this.getImg = function(imageIndex) {
    if(imageIndex < 11) {
      return this.img[imageIndex];
    } else {
      return this.img[imageIndex-11];
    }
  }
};
