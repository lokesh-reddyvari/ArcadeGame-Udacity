// Enemies our player must avoid
const BLOCK_HEIGHT= 83, BLOCK_WIDTH= 101;

var Character= function(x, y){ //Adding super class Object for Player and Enemy Objects
  this.x= x;
  this.y= y;
};

var Enemy = function(x, y, speed) { //Enemy class for bug. Initiates position and speed of a bug
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, x, y);  //calling super class for object creation
    this.sprite = 'images/enemy-bug.png';  //sprite holds bug image that should be displayed in the game
    this.speed= speed;
};

Enemy.prototype= Object.create(Character.prototype); //Create Enemy object by referring Character object

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=this.speed*dt; //uopdate bug position
    if(this.y===player.y-8 && player.x<this.x+79 && player.x+79>this.x){ //To detect collisions. If the bug collides with player, reset player position to starting point(Player lose the game)
      console.log("sfd");
      player.reset();
    }
    if(this.x>=606){ //if bug reaches end of paved path, reset bug position to starting point
      this.x=0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { //To draw image on the cavas at the specified location
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, x, y); //calling super class for object creation
    this.sprite = 'images/char-boy.png'; //sprite holds player image that should be displayed in the game
};

Player.prototype= Object.create(Character.prototype);

Player.prototype.update=function(dt){
  //will add score feature later
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput= function(key){ //update player position depending on the input keys
  if(key==='left' && this.x>=BLOCK_WIDTH){
    this.x-=BLOCK_WIDTH;
  }

  if(key==='right' && this.x<404){
    this.x+=BLOCK_WIDTH;
  }

  if(key==='up' && this.y>=73){
    this.y-=BLOCK_HEIGHT;
  }

  if(key==='down' && this.y<405){
    this.y+=BLOCK_HEIGHT;
  }

  if(this.y<0){
    this.reset();
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player= new Player(202, 405); //Initialize the player

var allEnemies= [];

var enemyPosition = [65, 148, 231]; //Define enemy positiions on the paved path. One bug on one paved path

enemyPosition.forEach(function(posY) { //For each bug load the initial positions and intialize
    enemy = new Enemy(BLOCK_WIDTH, posY, 100 + Math.floor(Math.random() * 300));
    allEnemies.push(enemy);
});

Player.prototype.reset= function(){ //Reset player position to starting point
  player.x= 202;
  player.y= 405;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) { //reads key press and assign string as value to the input key
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
