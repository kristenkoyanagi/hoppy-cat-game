

function Dog(posXbound, posYbound, posY,speed,direction,width,height) {
  this.speed = speed;
  this.direction = direction; // 1 is going to the right, -1 is going to the left
  this.posX = Math.random()*990+posXbound;
  this.posY = posY;
  this.posXbound = posXbound;
  this.posYbound = posYbound;
  this.width = width-10;
  this.height = height-5;
  this.imgRight = "images/dog_sprite_right.gif";
  this.imgLeft = "images/dog_sprite_left.gif";
  this.move = function() {
    this.posX = (this.posX+this.speed*this.direction);
    if(this.direction === 1) {
      this.posX = this.posX  >= this.posYbound  ? this.posXbound : this.posX;
    } else {
      this.posX = this.posX  <= this.posXbound ? this.posYbound : this.posX;
    }

  }
  this.newPosX = function() {
    this.posX = Math.random()*990+posXbound;
  }
}
