function Game() {
  this.lives = 5;
  this.points = 0;
  this.time = 60;
  this.level = 0;
  this.top = 0;
  this.left = 0;
  this.right = 0;
  this.bottom = 0;
  this.catX = 0;
  this.catY = 0;
  this.colWidth = $('.game').width()/12;
  this.rowHeight = $('.game').height()/10;
  this.endSpots = [];
  this.dogSpots = [155,430,500,225,295,570,155,430,500,225,295,570,155,430,500,225,295,570];
  this.levelSpeeds = [3,4,4.5,5,5.5,6,7,8];
  this.doggos = [];
  this.doggosImgs = [];
  this.currentDogs = 12;
  this.foods = [];
  this.foodImgs = [];
  this.endDogs = [];
  this.endDogsImgs = [];
  this.catIndex = 0;
  this.interval = null;
  this.eatFood = [false,false,false,false];
  this.winSound = null;
  this.updatePoints = function() {
    $('#points').attr('value',game.points);
    $('#points').text(`Points: ${game.points}`);
  };
  this.updateLives = function() {
    $('#lives').attr('value',game.lives);
    $('#lives').text(`Lives: ${game.lives}`)
  }
  this.resetTime = function() {
    $('#timer').text(`Time: ${game.time}seconds`);
  };
  this.nextLevel = function() {
    this.level += 1;
    if(this.level > 5) {
      this.time = 90;
    } else {
      this.time = 60;
    }
    this.points += 5000;
    this.lives += 3;
    this.eatFood = [false,false,false,false];
    this.resetTime();
  };
  this.reset = function() {
    this.currentDogs = 12;
    console.log("reset");
    this.time = 60;
    this.level = 0;
    this.points = 0;
    this.lives = 5;
    this.eatFood = [false,false,false,false];
    $('.progress-bar').attr('aira-valuenow', 100).css('width', '100%');
    this.updatePoints();
    this.updateLives()
  };
  this.coordinates = function() {
    var coords = $('.game').offset();
    this.top = coords.top;
    this.left = coords.left;
    this.right = this.left + $('.game').width()-this.colWidth;
    this.bottom = this.top + $('.game').height()-this.rowHeight;
  };
  this.createSpots = function() {
    var top = this.top+5;
    var leftMove = this.left+10;
    var topMove = this.top+5+this.rowHeight;
    for (var i = 0; i < 12; i++) {
      var spot = [leftMove,top];
      this.endSpots.push(spot);
      leftMove += this.colWidth;
      if(i < 7) {
        if(i !==3) {
          this.dogSpots.push(topMove);
          this.dogSpots.push(topMove);
        }
      }
      if(i === 7) {
        this.catY = topMove;
      }
      if(i ===5) {
        this.catX = leftMove;
      }
      topMove += this.rowHeight;
    }
    this.endSpots = this.endSpots.slice(1, 11).concat(this.endSpots.slice(0,1),this.endSpots.slice(11, 12));
  };
  this.setGame = function() {
    this.coordinates();
    this.createSpots();
  }

}
