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
  },

  create: function ()
  {
      // start the WorldScene
      this.scene.start('WorldScene');
  }
});

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

  create: function ()
  {
      // create the map
      var map = this.make.tilemap({ key: 'map' });
      
      // first parameter is the name of the tilemap in tiled
      var tiles = map.addTilesetImage('spritesheet', 'tiles');
      
      // creating the layers
      var grass = map.createStaticLayer('Grass', tiles, 0, 0);
      var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
      var trees = map.createStaticLayer('Obstacles', tiles, 0, 0);

      
      // make all tiles in obstacles collidable
      obstacles.setCollisionByExclusion([-1]);
      


      // our player sprite created through the phycis system
      this.player = this.physics.add.sprite(50, 100, 'player', 6);
      
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
      WorldScene
  ]
};
var game = new Phaser.Game(config);