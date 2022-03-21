var map;
var score = 0;
var scoreText;
var Points2 = 1;
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
      this.load.image('Chest', 'assets/Chest.png');
      this.load.image('Flower', 'assets/Flower.png');
      this.load.image('Strawberry', 'assets/Strawberry.png')
      this.load.image('Potato', 'assets/Potato.png')
      this.load.image('Bluberry', 'assets/Blueberry.png')



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
    this.add.text(95, 80, 'FARM - WORLD', { fontFamily: 'Oswald, "Goudy Bookletter 1911", Times, serif' });
    this.add.text(100, 100, 'CLICK ENTER', { fontFamily: 'Oswald, "Goudy Bookletter 1911", Times, serif' });
    this.add.text(15, 10, 'CONTROLS:', { fontFamily: 'Oswald, "Goudy Bookletter 1911", Times, serif' });
    this.add.text(10, 30, 'Click Enter to Till Ground', { fontFamily: 'Oswald, ' });
    this.add.text(8, 45, 'Arow Keys to move Around', { fontFamily: 'Oswald, ' });



    


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


  create: function ()
  {

      // create the map
      var map = this.make.tilemap({ key: 'map' });
      this.map = map
      
      // first parameter is the name of the tilemap in tiled
      var tiles = map.addTilesetImage('spritesheet', 'tiles');
      var Chest = map.addTilesetImage('Chest', 'Chest');
      var Flower = map.addTilesetImage('Flower', 'Flower');
      var Flower = map.addTilesetImage('Flower', 'Flower');
      var Strawberry = map.addTilesetImage('Strawberry', 'Strawberry');
      var Potato = map.addTilesetImage('Potato', 'Potato');
      var House = map.addTilesetImage('House', 'House');
      var Bluberry = map.addTilesetImage('Blueberry', 'Blueberry');




      // creating the layers
      this.grass = map.createDynamicLayer('Grass', tiles, 0, 0);
      var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
      var Chest = map.createDynamicLayer('Chest', Chest, 0, 0);
      var Flower = map.createDynamicLayer('Flower', Flower, 0, 0);
      var Strawberry = map.createDynamicLayer('Strawberry', Strawberry, 0 , 0);
      this.Potato = map.createDynamicLayer('Potato', Potato, 0 , 0);
      var House = map.createDynamicLayer('House', House, 0 , 0);
      var Bluberry = map.createDynamicLayer('Blueberry', Bluberry, 0 , 0);







      
      
      // make all tiles in obstacles collidable
      obstacles.setCollisionByExclusion([-1]);
      Chest.setCollisionByExclusion([-1]);



      


      // our player sprite created through the phycis system
      this.player = this.physics.add.sprite(240, 50, 'player', 6);

      
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
      this.physics.add.collider(this.player, Chest);
      this.enter_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

      this.pressed_enter = false

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

    if (this.enter_key.isDown) {
      this.pressed_enter = true
    }


    const TILLED = 6
    const UNTILLED = 1
    const OTHER_GRASS = 3
    const STRAWBERRY = 9
    const BLUBERRY = 1
    let under = this.map.getTileAtWorldXY(this.player.x,this.player.y,true,this.cameras.main,'Grass')


    if (!this.enter_key.isDown && this.pressed_enter == true) {
      this.pressed_enter = false
      let under = this.map.getTileAtWorldXY(this.player.x,this.player.y,true,this.cameras.main,'Grass')
      if(under.index === UNTILLED || under.index === OTHER_GRASS) {
        this.map.putTileAtWorldXY(TILLED,this.player.x,this.player.y,false,this.cameras.main,'Grass')
        document.getElementById("Points").innerHTML = Points2;
        Points2 += 1
      } else if(under.index === TILLED) {
       // this.map.putTileAtWorldXY(STRAWBERRY,this.player.x,this.player.y,false,this.cameras.main,'Strawberry')
      }

    }
    //console.log(under)

    if($("#strawberry-button").classList.contains('active') && under.index === TILLED)
    {
      this.map.putTileAtWorldXY(STRAWBERRY,this.player.x,this.player.y,false,this.cameras.main,'Strawberry')
    }
    if($("#blueberry-button").classList.contains('active')) {
      this.map.putTileAtWorldXY(BLUBERRY,this.player.x,this.player.y,false,this.cameras.main,'Bluberry')
    }
    if($("#potato-button").classList.contains('active')) {
      this.map.putTileAtWorldXY(Potato,this.player.x,this.player.y,false,this.cameras.main,'Potato')
      console.log("potato is active")
    }
    if($("#hoe-button").classList.contains('active')) {
      
    }
    
  },
  
});



var config = {
  type: Phaser.AUTO,
  parent: 'content',
  scale: {
       parent: 'content',
       //autoCenter: Phaser.Scale.CENTER_BOTH,
       width: 340,
       height: 260,
       zoom: 2,
   },
  //width: 320,
  //height: 240,
  //zoom:2,
  //zoom: 1 / window.devicePixelRatio, // Set the zoom to the inverse of the devicePixelRatio
  pixelArt: true,
  backgroundColor: '#64c987',
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


const $ = (sel) => document.querySelector(sel)
const $$ = (sel) => document.querySelectorAll(sel)
const on = (el,type,cb) => el.addEventListener(type,cb)


on($("#hoe-button"),'click',()=>{
  $$(".square").forEach(div => div.classList.remove('active'))
  $("#hoe-button").classList.add("active")
})
on($("#strawberry-button"),'click',()=>{
  $$(".square").forEach(div => div.classList.remove('active'))
  $("#strawberry-button").classList.add("active")
})
on($("#potato-button"),'click',()=>{
  $$(".square").forEach(div => div.classList.remove('active'))
  $("#potato-button").classList.add("active")
})
on($("#blueberry-button"),'click',()=>{
  $$(".square").forEach(div => div.classList.remove('active'))
  $("#blueberry-button").classList.add("active")
})



