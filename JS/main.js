(function() {
  $('.start-btn').on('click', function(){
    $('.start-screen').hide();
    $('.game-screen').show();
    if(clicks) {
      $('.level-screen').hide();
      game.reset();
      startSketch();
    }
    start();
    $('img').show();
    decreaseTime();
    clicks++;
  });

  $('.end-btn').on('click',function(){
    loseGame(true);
    console.log('here');
    $('.level-screen').hide();
  });

  $('.level-btn').on('click',function(){
    $('.level-screen').hide();
    $('.game-screen').show();
    $('img').show();
    if(game.level >= 8) {
      alert(`You beat level ${game.level-1} with a score of ${game.points}!`);
    }
    startSketch();
    decreaseTime();
  });
})();


var clicks = 0;
var started = false;
var catImg,foodImg,dogEndImg,dogMoveImg;
var cat;
var meowSound,bark;
var cats = [];
var catsImgs = [];
var game = new Game();
game.setGame();

function start(){
  started = true;
}

// function preload() {
//   meowSound = loadSound("audio/meow.mp3");
//   bark = loadSound("audio/woof.mp3");
// }

function setup() {
  //set up the first cat + cat array
  cat = new Cat(game.catX,game.catY,game.colWidth,game.rowHeight);
  cat.setBounds(game.top,game.left,game.bottom,game.right);
  catImg = createImg(cat.getImg(game.catIndex));
  cats.push(cat);
  catsImgs.push(catImg);
  catsImgs[game.catIndex].position(cats[game.catIndex].posX, cats[game.catIndex].posY);
  catsImgs[game.catIndex].size(cats[game.catIndex].width, cats[game.catIndex].height);

  //set up end row foods and dogs
  sortEndSpots();
  for(let i = 0; i < 4; i++) {
    var spot = game.endSpots[i];
    var food = new EndObject(spot[0],spot[1],game.colWidth,game.rowHeight);
    foodImg = createImg(food.foodImg)
    foodImg.position(food.posX, food.posY);
    foodImg.size(food.width, food.height);
    game.foods.push(food);
    game.foodImgs.push(foodImg);
  }
  for(let i = 4; i < 12; i++) {
    var spot = game.endSpots[i];
    var dog = new EndObject(spot[0],spot[1],game.colWidth,game.rowHeight);
    dogEndImg = createImg(dog.dogImg);
    dogEndImg.position(dog.posX, dog.posY);
    dogEndImg.size(dog.width, dog.height);
    game.endDogs.push(dog);
    game.endDogsImgs.push(dogEndImg);
  }
  addDogs(18);
}

//continually calls this draw function to keep drawing the objects on screen using the p5 dom library
function draw() {
  if(started) {
    background(255,255,255);
    showCats();
    for(let i = 0; i <  game.currentDogs; i++) {
      game.doggos[i].move();
      game.doggosImgs[i].position(game.doggos[i].posX, game.doggos[i].posY);
      game.doggosImgs[i].size(game.doggos[i].width, game.doggos[i].height);
      game.doggosImgs[i].show();
    }
    for (var i = game.currentDogs; i < game.doggos.length; i++) {
      game.doggos[i].posX = -100;
      // game.doggos[i].posY = -100;
      game.doggosImgs[i].position(game.doggos[i].posX, game.doggos[i].posY);
    }
    loseGame(false);
    checkCollisions();
  }
}

//shuffles the end spots for the dogs and the food bowls
function sortEndSpots() {
  game.endSpots = game.endSpots.slice(0, 10).sort(function() {
    return .5 - Math.random();
  }).concat(game.endSpots.slice(10, 12));
  console.log(  game.endSpots);
}


//call this function to re-setup the game after reset or next level
function startSketch() {
  game.catIndex = 0;
  cats = [];
  //for cats
  var newCat = new Cat(game.catX,game.catY,game.colWidth,game.rowHeight);
  newCat.setBounds(game.top,game.left,game.bottom,game.right);
  cats.push(newCat);

  //hide all other catImgs
  catsImgs.forEach(function(cat){
    cat.position(-100,-100);
    cat.size(cats[game.catIndex].width, cats[game.catIndex].height);
  });

  //position first cat
  catsImgs[game.catIndex].position(cats[game.catIndex].posX, cats[game.catIndex].posY);
  catsImgs[game.catIndex].size(cats[game.catIndex].width, cats[game.catIndex].height);
  if(game.level % 2 === 1) {
    game.currentDogs++;
    if(game.level === 7) {
      game.currentDogs = 18;
    }
    console.log(game.currentDogs);
  }

  //change speed of moving dogs
  for(let i = 0; i < game.doggos.length; i++) {
    game.doggos[i].speed = game.levelSpeeds[game.level]*Math.random()+2;
  }

  //move dogs that aren't on level off the screen
  for(let i = 0; i <  game.currentDogs; i++) {
    game.doggos[i].newPosX;
    game.doggosImgs[i].position(game.doggos[i].posX, game.doggos[i].posY);
  }

  //reshuffle and replace the end dogs and food bowls.
  sortEndSpots();
  for(let i = 0; i < game.endSpots.length; i++) {
    var spot = game.endSpots[i];
    if(i < 4) {
      game.foodImgs[i].position(spot[0],spot[1]);
      game.foods[i].posX = spot[0];
      game.foods[i].posY = spot[1];
    } else {
      game.endDogsImgs[i-4].position(spot[0],spot[1]);
      game.endDogs[i-4].posX = spot[0];
      game.endDogs[i-4].posY = spot[1];
    }
  }
  start();

}

var toggleMove = true;
//continually calls this function from the p5 dom library. checks if you move the cat.
function keyPressed() {
  if(started) {
    var value ="";
    // if(keyCode === 32) {
    //   toggleMovement();
    // }
    if(toggleMove) {
      switch(keyCode) {
        case LEFT_ARROW:
        value = "left";
        console.log('here');
        break;
        case RIGHT_ARROW:
        value = "right";
        break;
        case UP_ARROW:
        value = "up";
        break;
        case DOWN_ARROW:
        value = "down";
        break;
        default:
      }
    }
    catsImgs[game.catIndex].hide();
    cats[game.catIndex].move(value);
    console.log('keymove');
  }

}


//show the cats on the screen with the draw function
function showCats() {
  for (var i = 0; i < cats.length; i++) {
    catsImgs[i].position(cats[i].posX, cats[i].posY);
    catsImgs[i].size(cats[i].width, cats[i].height);
    catsImgs[i].show();
  }
}

// Add dogs to the game object and saves them with the position and speed
function addDogs(num) {
  if(game.dogSpots) {
    for(let i = 0; i < num; i++) {
      var spot = game.dogSpots[i];
      if(i%2===0) {
        var dog = new Dog(game.left, game.right, spot,game.levelSpeeds[game.level]*Math.random()+2,1, game.colWidth, game.rowHeight);
        dogMoveImg = createImg(dog.imgRight);
      } else {
        var dog = new Dog(game.left, game.right, spot,game.levelSpeeds[game.level]*Math.random()+2,-1,  game.colWidth, game.rowHeight);
        dogMoveImg = createImg(dog.imgLeft);
      }
      dogMoveImg.position(dog.posX, dog.posY);
      dogMoveImg.size(dog.width, dog.height);
      game.doggos.push(dog);
      game.doggosImgs.push(dogMoveImg);
    }
  }
}

// // creates a new dog object and places it
// function newDog() {
//   var spot = game.dogSpots[game.currentDogs];
//   if(game.currentDogs%2===0) {
//     var dog = new Dog(game.left, game.right, spot,game.levelSpeeds[game.level]*Math.random()+1,1, game.colWidth, game.rowHeight);
//     dogMoveImg = createImg(dog.imgRight);
//   } else {
//     var dog = new Dog(game.left, game.right, spot,game.levelSpeeds[game.level]*Math.random()+1,-1,  game.colWidth, game.rowHeight);
//     dogMoveImg = createImg(dog.imgLeft);
//   }
//   dogMoveImg.position(dog.posX, dog.posY);
//   dogMoveImg.size(dog.width, dog.height);
//   game.doggos.push(dog);
//   game.doggosImgs.push(dogMoveImg);
// }

//creates a new cat at the beginning position
function newCat() {
  game.catIndex +=1;
  var newCat = new Cat(game.catX,game.catY,game.colWidth,game.rowHeight);
  newCat.setBounds(game.top,game.left,game.bottom,game.right);
  var newCatImg = createImg(newCat.getImg(game.catIndex));
  newCatImg.position(newCat.posX, newCat.posY);
  newCatImg.size(newCat.width, newCat.height);
  cats.push(newCat);
  catsImgs.push(newCatImg);
}

// adds a short movement pause after a new cat respawns
function toggleMovement() {
  toggleMove = !toggleMove;
  if(toggleMove) {
    $('#movement').html("Move: <strong>ON</strong>");
  } else {
    $('#movement').html("Move: <strong>OFF</strong>");
  }
}

//starts the timer on the bottom when the level starts
function decreaseTime() {
  game.interval = setInterval(function(){
    game.time = game.time-1;
    if(game.time === 0) {
      loseGame(false);
    }
    $('#timer').text(`Time: ${game.time}seconds`);
    if(game.level > 5) {
      var currScore = game.time*100/90;
      currScore = parseInt(currScore);
      var newScore = currScore-(100/90);
    } else {
      var currScore = game.time*100/60;
      currScore = parseInt(currScore);
      var newScore = currScore-(100/60);
    }
    $('.progress-bar').attr('aira-valuenow', newScore).css('width', newScore+'%');
  },1000);
}



//Checks if the current Cat has hit any of the objects in the game using didHit function
function checkCollisions() {
  game.doggos.forEach(function(dog){
    if(didHit(dog)) {
      // bark.play();
      console.log('hit dog');
      loseLife();
    }
  });
  game.endDogs.forEach(function(dog){
    if(didHit(dog)) {
      // bark.play(0,1,1,0,1);
      console.log('hit end dog');
      loseLife();
    }
  });
  game.foods.forEach(function(food, i){
    if(didHit(food)) {
      // meowSound.play();
      game.eatFood[i] = true;
      game.points += 1000;
      game.updatePoints();
      // cats[game.catIndex].posY = cats[game.catIndex].posY-cats[game.catIndex].height;
      console.log(cats[game.catIndex]);
      showCats();
      newCat();
      toggleMovement();
      setTimeout(function(){ toggleMovement(); },500);
      winGame();
    }
  });
}

//checks if an object "thing" has hit the cat
function didHit(thing) {
  var cat = cats[game.catIndex];
  if (cat.posX < thing.posX + thing.width &&
    cat.posX + thing.width > thing.posX &&
    cat.posY < thing.posY + thing.height &&
    cat.height + cat.posY > thing.posY) {
      // collision detected!
      console.log(cat);
      console.log(thing);
      return true;
    }
  }

//when you lose the level, this function is called
  function loseGame(stop) {
    if(game.time === 0 || game.lives === 0 || stop) {
      started = false;
      clearInterval(game.interval);
      if(game.level ===0) {
        alert(`You lost with a score of ${game.points}!`);
      } else {
        alert(`You beat level ${game.level} with a score of ${game.points}!`);
      }
      $('img').hide();
      $('.game-screen').hide();
      $('.start-screen').show();
    }
  }

//call this when a cat hits one of the dog objects
  function loseLife() {
    game.lives -= 1;
    game.points -= 500;
    // catImg.hide();
    cats[game.catIndex].posX =  -820;
    cats[game.catIndex].posY = -641;
    game.updatePoints();
    game.updateLives()
    catsImgs[game.catIndex].position(cats[game.catIndex].posX, cats[game.catIndex].posY);
    catsImgs[game.catIndex].size(cats[game.catIndex].width, cats[game.catIndex].height);
    newCat();
    toggleMovement();
    setTimeout(function(){ toggleMovement(); },500);
  }

//checks if they have won the level and updates the score/everything so they can move to the next level
  function winGame() {
    if(game.eatFood.includes(false)) {
    } else {
      started = false;
      $('img').hide();
      $('.game-screen').hide();
      $('.level-screen').show();
      clearInterval(game.interval);
      game.nextLevel();
      $('.progress-bar').attr('aira-valuenow', 100).css('width', '100%');
      if(game.level < 8) {
        $('.level-screen h2').text(`Level: ${game.level+1}`);
        alert(`You beat level ${game.level}`);
      } else {
        $('.level-screen h2').text('You won!');
        alert(`You beat level ${game.level}`);
        $('.level-btn').hide();
      }
      game.updatePoints();
      game.updateLives()
    }
  }
