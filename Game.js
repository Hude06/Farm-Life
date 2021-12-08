var config = { //create configuration for game
    type: Phaser.CANVAS,
    width: 1000, //size of window
    height: 1000,
    physics: {
      default: 'arcade', //the physics engine the game will use
      arcade: {
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
   
  var game = new Phaser.Game(config); //create the game object
   
  //initialise global variables
  var player;
  var obstacles;
  var cursors;
   
  var yLimit;
  var xLimit;
   
  function preload () { //this function loads images before the game starts
    //each image is given a name that is used to refer to it later on
    this.load.image('floor', 'assets/Farm.jpg');
    this.load.image('player', 'assets/player.png');
  }
   
  function create () { //this function creates sprites at the start of the game
    let background = this.add.image(0, 0, 'floor').setScale(1);
    background.x = background.displayWidth / 2;
    background.y = background.displayHeight / 2;
    xLimit = background.displayWidth; //the player cannot go beyond these x and
    yLimit = background.displayHeight; //y positions
   
    player = this.physics.add.sprite(300, 300, 'player'); //create the player sprite
    player.setScale(0.4); //make it appear smaller
   
    cursors = this.input.keyboard.createCursorKeys(); //creates an object containing hotkeys
   
    this.cameras.main.setBounds(0, 0, xLimit, yLimit);
   
    obstacles = this.physics.add.staticGroup(); //create group for obstacles
    obstacles.create(0, 0, 'obstacle');
    obstacles.create(0, 0, 'obstacle');
   
    this.physics.add.collider(player, obstacles); //collision detection between player and obstacles
  }
   
  function update () { //this function runs every frame
    if (cursors.left.isDown && player.x >= 0) {
        player.setVelocityX(-200); //go left
    }
    else if (cursors.right.isDown && player.x <= xLimit) {
        player.setVelocityX(200); //go right
    }
    else {
        player.setVelocityX(0); //don't move left or right
    }
   
    if (cursors.up.isDown && player.y >= 0) {
        player.setVelocityY(-200); //move up
    }
    else if (cursors.down.isDown && player.y <= yLimit) {
        player.setVelocityY(200); //move down
    }
    else {
        player.setVelocityY(0); //don't move up or down
    }
   
    this.cameras.main.centerOn(player.x, player.y); //centre camera on current position of player
  }