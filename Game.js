var map;
var BootScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function BootScene ()
  {
      Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload: function ()
  {  
      // map tiles
      this.load.image('tiles', 'assets/spritesheet.png');
      // map in json format
      this.load.tilemapTiledJSON('map', 'assets/tileset.json');
      // our two characters
      this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('trader', 'assets/trader.png', { frameWidth: 16, frameHeight: 16 });

      

  },
  create: function ()
  {
      // start the Menu
      this.scene.start('Menu');
  }
});

var Menu = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

  function Menu ()
  {
  Phaser.Scene.call(this, { key: 'Menu' });
  },
  preload: function (){
  },
  update: function () {
      if (enter_key.isDown) {
        this.scene.start('WorldScene');
      }
    },


  create: function (){
    cursors = this.input.keyboard.createCursorKeys()
    enter_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this.cameras.main.setBackgroundColor('rgba(4, 248, 199, 0.9)');
    this.add.text(105, 35, 'Farm - World', { fontFamily: 'arial, "Goudy Bookletter 1911", Times, serif' });
    this.add.text(100, 15, 'CLICK ENTER', { fontFamily: 'arial, "Goudy Bookletter 1911", Times, serif' });
  },
  
}
)
  
  

var WorldScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function WorldScene ()
  {
      Phaser.Scene.call(this, { key: 'WorldScene' });
  },

  preload: function ()
  {
      
  },

  ReplaceTiles: function () {

    //  This will replace every instance of tile 31 (cactus plant) with tile 46 (the sign post).
    //  It does this across the whole layer of the map unless a region is specified.

    //  You can also pass in x, y, width, height values to control the area in which the replace happens

    map.replace(grass, ground);

  },
  create: function ()
  {
      // create the map
      var map = this.make.tilemap({ key: 'map' });
      
      // first parameter is the name of the tilemap in tiled
      var tiles = map.addTilesetImage('spritesheet', 'tiles');
      
      // creating the layers
      var grass = map.createStaticLayer('Grass', tiles, 0, 0);
      var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
      var grass = map.createStaticLayer('howing grass', tiles, 0, 0);

      
      
      // make all tiles in obstacles collidable
      obstacles.setCollisionByExclusion([-1]);
      


      // our player sprite created through the phycis system
      this.player = this.physics.add.sprite(240, 50, 'player', 6);
      this.trader = this.physics.add.sprite(240, 50, 'trader', 6);

      
      this.physics.world.bounds.width = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels
      this.player.setCollideWorldBounds(true) ;
      this.cursors = this.input.keyboard.createCursorKeys();
      this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
      this.cameras.main.roundPixels = true;
      this.anims.create({
          //animat left, Player
          key: 'left',
          frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13 ] }),
          frameRate: 10,
          repeat: -1,
      });
      this.anims.create({
          //animate right
          key: 'right',
          frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13 ] }),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
          //animate up
          key: 'up',
          frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14 ] }),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
          //animate up
          key: 'down',
          frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
        //animate up
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { frames: [0, 5, 0, 11 ] }),
        frameRate: 10,
        repeat: -1
    });
      
      this.physics.add.collider(this.player, obstacles);

  },
  update: function (time, delta){
      this.player.body.setVelocity(0);
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-80);
        this.player.flipX=true
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(80);
        this.player.flipX=false
      }

      if (this.cursors.up.isDown) {
        this.player.body.setVelocityY (-80);
      } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(80);
      }
  
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true)
    } else if (this.cursors.up.isDown){
        this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown){
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }

  }
  
});

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false // set to true to view zones
      }
  },
  scene: [
      BootScene,
      Menu,
      WorldScene,
  ]
};
var game = new Phaser.Game(config);