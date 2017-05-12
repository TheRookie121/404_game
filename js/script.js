function Hero(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'hero');

  this.anchor.set(.5, .5);
  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;

  this.animations.add('stop', [0]);
  this.animations.add('run',[1, 2], 8, true);
  this.animations.add('jump', [3]);
  this.animations.add('fall', [4]);
  this.animations.add('die', [5, 6, 5, 6, 5, 6, 5, 6], 12);
};

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function(direction) {
  const speed = 200;

  this.body.velocity.x = direction * speed;

  if (this.body.velocity.x < 0) {
    this.scale.x = -1;
  } else if (this.body.velocity.x > 0) {
    this.scale.x = 1;
  }
};

Hero.prototype.jump = function() {
  const jumpSpeed = 600;
  let canJump = this.body.touching.down;

  if (canJump) {
    this.body.velocity.y = -jumpSpeed;
  }

  return canJump;
};

Hero.prototype.bounce = function() {
  const bounceSpeed = 200;

  this.body.velocity.y = -bounceSpeed;
};

Hero.prototype.update = function() {
  let animationName = this._getAnimationName();

  if (this.animations.name !== animationName) {
    this.animations.play(animationName);
  }
};

Hero.prototype.die = function() {
  this.alive = false;
  this.body.enable = false;

  this.animations.play('die').onComplete.addOnce(function () {
    this.kill();
  }, this);
};

Hero.prototype.freeze = function() {
  this.isFrozen = true;
  this.body.enable = false;
};

Hero.prototype._getAnimationName = function() {
  let name = 'stop';

  if (!this.alive) {
    name = 'die';
  } else if (this.isFrozen) {
    name = 'run';
  } else if (this.body.velocity.y < 0) {
    name = 'jump';
  } else if (this.body.velocity.y >= 0 && !this.body.touching.down) {
    name = 'fall';
  } else if (this.body.velocity.x !== 0 && this.body.touching.down) {
    name = 'run';
  }

  return name;
};

function Spider(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'spider');

  this.anchor.set(.5);
  this.animations.add('crawl', [0, 1, 2] , 8, true);
  this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3,], 12);
  this.animations.play('crawl');

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
  this.body.velocity.x = spiderSpeed;
};

spiderSpeed = 100;

Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.update = function() {
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -spiderSpeed;
    this.scale.x = 1;
  } else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = spiderSpeed;
    this.scale.x = -1
  }
};

Spider.prototype.die = function() {
  this.body.enable = false;

  this.animations.play('die').onComplete.addOnce(function() {
    this.kill();
  }, this);
};

LoadState = {};

LoadState.init = function() {
  this.game.renderer.renderSession.roundPixels = true;
};

LoadState.preload = function() {
  this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;

  this.game.load.json('level:0', 'data/level0.json');
  this.game.load.json('level:1', 'data/level1.json');
  this.game.load.json('level:2', 'data/level2.json');

  this.game.load.image('background', 'img/background.png');
  this.game.load.image('ground', 'img/ground.png');
  this.game.load.image('grass:8x1', 'img/grass_8x1.png');
  this.game.load.image('grass:6x1', 'img/grass_6x1.png');
  this.game.load.image('grass:4x1', 'img/grass_4x1.png');
  this.game.load.image('grass:2x1', 'img/grass_2x1.png');
  this.game.load.image('grass:1x1', 'img/grass_1x1.png');
  this.game.load.image('invisible-wall', 'img/invisible_wall.png');
  this.game.load.image('key', 'img/key.png');

  this.game.load.image('font:numbers', 'img/numbers.png');

  this.game.load.image('icon:coin', 'img/icon/coin_icon.png');
  this.game.load.image('icon:W', 'img/icon/W_icon.png');
  this.game.load.image('icon:A', 'img/icon/A_icon.png');
  this.game.load.image('icon:D', 'img/icon/D_icon.png');
  this.game.load.image('icon:Up', 'img/icon/Up_icon.png');
  this.game.load.image('icon:Left', 'img/icon/Left_icon.png');
  this.game.load.image('icon:Right', 'img/icon/Right_icon.png');
  this.game.load.image('icon:Spacebar', 'img/icon/Spacebar_icon.png');
  this.game.load.image('icon:heart', 'img/icon/heart_icon.png');

  this.game.load.image('text:gameTitle', 'img/text/gameTitle_text.png');
  this.game.load.image('text:youWin', 'img/text/youWin_text.png');
  this.game.load.image('text:awesome', 'img/text/awesome_text.png');
  this.game.load.image('text:play', 'img/text/play_text.png');
  this.game.load.image('text:playAgain', 'img/text/playAgain_text.png');
  this.game.load.image('text:controlsSmall', 'img/text/controls_small_text.png');
  this.game.load.image('text:controlsBig', 'img/text/controls_big_text.png');
  this.game.load.image('text:goBack', 'img/text/back_text.png');
  this.game.load.image('text:moveLeft', 'img/text/moveLeft_text.png');
  this.game.load.image('text:moveRight', 'img/text/moveRight_text.png');
  this.game.load.image('text:jump', 'img/text/jump_text.png');
  this.game.load.image('text:dash', 'img/text/dash_text.png');
  this.game.load.image('text:slash', 'img/text/slash_text.png');
  this.game.load.image('text:madeBy', 'img/text/madeBy_text.png');
  this.game.load.image('text:gameOver', 'img/text/gameOver_text.png');
  this.game.load.image('text:score', 'img/text/score_text.png');

  this.game.load.audio('sfx:jump', 'audio/jump.wav');
  this.game.load.audio('sfx:coin', 'audio/coin.wav');
  this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
  this.game.load.audio('sfx:key','audio/key.wav');
  this.game.load.audio('sfx:door', 'audio/door.wav');
  this.game.load.audio('sfx:death', 'audio/death.wav');
  this.game.load.audio('sfx:gameWon', 'audio/gameWon.wav');
  this.game.load.audio('sfx:startGame', 'audio/startGame.ogg');
  this.game.load.audio('sfx:select', 'audio/select.mp3');

  this.game.load.spritesheet('coin', 'img/coin_animated.png', 22, 22);
  this.game.load.spritesheet('spider', 'img/spider.png', 42, 32);
  this.game.load.spritesheet('hero', 'img/hero.png', 36, 42);
  this.game.load.spritesheet('door', 'img/door.png', 42, 66);
  this.game.load.spritesheet('icon:key', 'img/key_icon.png', 34, 30);
  this.game.load.spritesheet('decoration', 'img/decor.png', 42, 42);
};

LoadState.create = function() {
  this.game.state.start('gameTitle');
};

GameTitleState = {};

GameTitleState.init = function(data) {
  this.keys = this.game.input.keyboard.addKeys({
    spacebar: Phaser.KeyCode.SPACEBAR,
    enter: Phaser.KeyCode.ENTER,
  });

  this.keys.spacebar.onDown.add(function() {
    this.sfx.startGame.play();
    this.game.state.start('play', true, false, {level: 0});
  }, this);

  this.keys.enter.onDown.add(function() {
    this.sfx.startGame.play();
    this.game.state.start('play', true, false, {level: 0});
  }, this);
};

GameTitleState.create = function() {
  this.game.add.image(0, 0, 'background');
  this.gameTitleText = this.game.add.image(this.game.world.width / 2, this.game.world.height / 2.5, 'text:gameTitle');
  this.gameTitleText.anchor.set(.5, .5);
  this.playText = this.game.add.button(this.game.world.width / 2, this.game.world.height / 1.5, 'text:play', playGame, this);
  this.playText.anchor.set(.5, .5);
  this.controlsSmallText = this.game.add.button(this.game.world.width / 2, this.game.world.height / 1.3, 'text:controlsSmall', showControls, this);
  this.controlsSmallText.anchor.set(.5, .5);
  this.madeByText = this.game.add.image(this.game.world.width / 1.1, this.game.world.height / 1.07, 'text:madeBy');
  this.madeByText.anchor.set(.5, .5);

  this.sfx = {
    startGame: this.game.add.audio('sfx:startGame'),
    select: this.game.add.audio('sfx:select'),
  };
};

function playGame() {
  this.sfx.startGame.play();
  this.game.state.start('play', true, false, {level: 2});
};

function showControls() {
  this.sfx.select.play();
  this.game.state.start('controls');
};

ControlsState = {};

ControlsState.create = function() {
  this.game.add.image(0, 0, 'background');
  this.controlsBigText = this.game.add.image(this.game.world.width / 2, this.game.world.height / 6, 'text:controlsBig');
  this.controlsBigText.anchor.set(.5, .5);
  this.goBackText = this.game.add.button(this.game.world.width / 9, this.game.world.height / 6, 'text:goBack', goBack, this);
  this.goBackText.anchor.set(.5, .5);

  this.moveLeftText = this.game.add.image(this.game.world.width / 4, this.game.world.height / 3, 'text:moveLeft');
  this.moveLeftText.anchor.set(.5, .5);
  this.moveRightText = this.game.add.image(this.game.world.width / 4, this.game.world.height / 2, 'text:moveRight');
  this.moveRightText.anchor.set(.5, .5);
  this.jumpText = this.game.add.image(this.game.world.width / 4, this.game.world.height / 1.5, 'text:jump');
  this.jumpText.anchor.set(.5, .5);

  this.dashText = this.game.add.image(this.game.world.width / 2, this.game.world.height / 3, 'text:dash');
  this.dashText = this.game.add.image(this.game.world.width / 2, this.game.world.height / 2, 'text:dash');
  this.dashText = this.game.add.image(this.game.world.width / 2, this.game.world.height / 1.5, 'text:dash');
  this.dashText.anchor.set(.5, .5);

  this.aIcon = this.game.add.image(this.game.world.width / 1.5, this.game.world.height / 3, 'icon:A');
  this.aIcon.anchor.set(.5, .5);
  this.slashText = this.game.add.image(this.game.world.width / 1.4, this.game.world.height / 3, 'text:slash');
  this.slashText.anchor.set(.5, .5);
  this.leftIcon = this.game.add.image(this.game.world.width / 1.3, this.game.world.height / 3, 'icon:Left');
  this.leftIcon.anchor.set(.5, .5);

  this.dIcon = this.game.add.image(this.game.world.width / 1.5, this.game.world.height / 2, 'icon:D');
  this.dIcon.anchor.set(.5, .5);
  this.slashText = this.game.add.image(this.game.world.width / 1.4, this.game.world.height / 2, 'text:slash');
  this.slashText.anchor.set(.5, .5);
  this.rightIcon = this.game.add.image(this.game.world.width / 1.3, this.game.world.height / 2, 'icon:Right');
  this.rightIcon.anchor.set(.5, .5);

  this.wIcon = this.game.add.image(this.game.world.width / 1.7, this.game.world.height / 1.5, 'icon:W');
  this.wIcon.anchor.set(.5, .5);
  this.slashText = this.game.add.image(this.game.world.width / 1.6, this.game.world.height / 1.5, 'text:slash');
  this.slashText.anchor.set(.5, .5);
  this.upIcon = this.game.add.image(this.game.world.width / 1.5, this.game.world.height / 1.5, 'icon:Up');
  this.upIcon.anchor.set(.5, .5);
  this.slashText = this.game.add.image(this.game.world.width / 1.4, this.game.world.height / 1.5, 'text:slash');
  this.slashText.anchor.set(.5, .5);
  this.spacebarIcon = this.game.add.image(this.game.world.width / 1.23, this.game.world.height / 1.5, 'icon:Spacebar');
  this.spacebarIcon.anchor.set(.5, .5);

  this.sfx = {
    select: this.game.add.audio('sfx:select'),
  };
};

function goBack() {
  this.sfx.select.play();
  this.game.state.start('gameTitle');
};

PlayState = {};

const levelCount = 3;
let lives = 3;
let coinPickupCount = 0;

PlayState.init = function(data) {
  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT,
    up: Phaser.KeyCode.UP,
    a: Phaser.KeyCode.A,
    d: Phaser.KeyCode.D,
    w: Phaser.KeyCode.W,
    spacebar: Phaser.KeyCode.SPACEBAR,
  });

  this.keys.up.onDown.add(function () {
    let didJump = this.hero.jump();

    if (didJump) {
      this.sfx.jump.play();
    }
  }, this);

this.keys.w.onDown.add(function () {
    let didJump = this.hero.jump();

    if (didJump) {
      this.sfx.jump.play();
    }
  }, this);

this.keys.spacebar.onDown.add(function () {
    let didJump = this.hero.jump();

    if (didJump) {
      this.sfx.jump.play();
    }
  }, this);

  this.hasKey = false;
  this.level = (data.level || 0) % levelCount;
};

PlayState.create = function() {
  this.camera.flash('#000000');

  this.sfx = {
    key: this.game.add.audio('sfx:key'),
    door: this.game.add.audio('sfx:door'),
    jump: this.game.add.audio('sfx:jump'),
    coin: this.game.add.audio('sfx:coin'),
    stomp: this.game.add.audio('sfx:stomp'),
    death: this.game.add.audio('sfx:death'),
    gameWon: this.game.add.audio('sfx:gameWon'),
  };

  this.game.add.image(0, 0, 'background');
  this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));
  this._createHud();
};

PlayState.update = function() {
  this._handleCollisions();
  this._handleInput();
  this.coinFont.text = `x${coinPickupCount}`;
  this.keyIcon.frame = this.hasKey ? 1 : 0;
  this.heartFont.text = `x${lives}`;
};

PlayState._loadLevel = function(data) {
  this.bgDecoration = this.game.add.group();
  this.platforms = this.game.add.group();
  this.coins = this.game.add.group();
  this.spiders = this.game.add.group();
  this.enemyWalls = this.game.add.group();

  this.enemyWalls.visible = false;

  data.platforms.forEach(this._spawnPlatform, this);

  data.coins.forEach(this._spawnCoin, this);

  data.decoration.forEach(function (deco) {
    this.bgDecoration.add(
      this.game.add.image(deco.x, deco.y, 'decoration', deco.frame));
  }, this);

  this._spawnCharacters({
    hero: data.hero,
    spiders: data.spiders,
  });

  this._spawnDoor(data.door.x, data.door.y);
  this._spawnKey(data.key.x, data.key.y);

  const gravity = 1200;

  this.game.physics.arcade.gravity.y = gravity;
};

PlayState._spawnPlatform = function(platform) {
  let sprite = this.platforms.create(
    platform.x, platform.y, platform.image
  );

  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
  sprite.body.immovable = true;

  this._spawnEnemyWall(platform.x, platform.y, 'left');
  this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};

PlayState._spawnCharacters = function(data) {
  data.spiders.forEach(function (spider) {
    let sprite = new Spider(this.game, spider.x, spider.y);
    this.spiders.add(sprite);
  }, this);

  this.hero = new Hero(this.game, data.hero.x, data.hero.y);
  this.game.add.existing(this.hero);
};

PlayState._spawnCoin = function(coin) {
  let sprite = this.coins.create(coin.x, coin.y, 'coin');

  sprite.anchor.set(.5, .5);
  sprite.animations.add('rotate', [0, 1, 2, 3], 6, true);
  sprite.animations.play('rotate');

  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
};

PlayState._spawnEnemyWall = function(x, y, side) {
  let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
  sprite.anchor.set(side === 'left' ? 1 : 0, 1);

  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
  sprite.body.immovable = true;
};

PlayState._spawnDoor = function(x, y) {
  this.door = this.bgDecoration.create(x, y, 'door');
  this.door.anchor.setTo(.5, 1);
  this.game.physics.enable(this.door);
  this.door.body.allowGravity = false;
};

PlayState._spawnKey = function(x, y) {
  this.key = this.bgDecoration.create(x, y, 'key');
  this.key.anchor.set(.5, .5);
  this.game.physics.enable(this.key);
  this.key.body.allowGravity = false;

  this.key.y -= 3;
  this.game.add.tween(this.key)
    .to({ y: this.key.y + 6 }, 800, Phaser.Easing.Sinusoidal.InOut)
    .yoyo(true)
    .loop()
    .start();
};

PlayState._handleInput = function() {
  if (this.keys.left.isDown || this.keys.a.isDown) {
    this.hero.move(-1);
  } else if (this.keys.right.isDown || this.keys.d.isDown) {
    this.hero.move(1);
  } else {
    this.hero.move(0);
  }

  this.keys.up.onDown.add(function() {
    this.hero.jump();
  }, this);

  this.keys.w.onDown.add(function() {
    this.hero.jump();
  }, this);

  this.keys.spacebar.onDown.add(function() {
    this.hero.jump();
  }, this);
};

PlayState._handleCollisions = function() {
  this.game.physics.arcade.collide(this.spiders, this.platforms);
  this.game.physics.arcade.collide(this.spiders, this.enemyWalls);
  this.game.physics.arcade.collide(this.hero, this.platforms);

  this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin, null, this);
  this.game.physics.arcade.overlap(this.hero, this.spiders, this._onHeroVsEnemy, null, this);
  this.game.physics.arcade.overlap(this.hero, this.key, this._onHeroVsKey, null, this);
  this.game.physics.arcade.overlap(this.hero, this.door, this._onHeroVsDoor, function(hero, door) {
    return this.hasKey && hero.body.touching.down;
  }, this);
};

PlayState._onHeroVsCoin = function(hero, coin) {
  this.sfx.coin.play();
  coin.kill();
  coinPickupCount++;
};

PlayState._onHeroVsEnemy = function(hero, enemy) {
  if (hero.body.velocity.y > 0) {
    enemy.die();
    hero.bounce();
    this.sfx.stomp.play();
  } else {
    lives--;
    hero.die();
    this.sfx.death.play();
    hero.events.onKilled.addOnce(function() {
      this.game.state.restart(true, false, {level: this.level});
    }, this);

    enemy.body.touching = enemy.body.wasTouching;
  }

  if (lives == 0) {
    hero.die();
    lives = 3;
    coinPickupCount = 0;
    this.sfx.death.play();

    hero.events.onKilled.addOnce(function() {
      this.game.state.start('gameOver');
    }, this);
  }
};

PlayState._onHeroVsKey = function(hero, key) {
  this.sfx.key.play();
  key.kill();
  this.hasKey = true;
};

PlayState._onHeroVsDoor = function(hero, door) {
  door.frame = 1;
  this.sfx.door.play();
  hero.freeze();
  this.game.add.tween(hero)
    .to({x: this.door.x, alpha: 0}, 500, null, true)
    .onComplete.addOnce(this._goToNextLevel, this);
};

PlayState._goToNextLevel = function() {
  this.camera.fade('#000000');
  this.camera.onFadeComplete.addOnce(function() {
    this.game.state.restart(true, false, {level: this.level + 1});

    if (this.level == 2) {
      lives = 3;
      coinPickupCount = 0;
      this.game.state.start('gameWon');
      this.sfx.gameWon.play();
    }
  }, this);
};

PlayState._createHud = function() {
  this.keyIcon = this.game.make.image(0, 19, 'icon:key');
  this.keyIcon.anchor.set(0, .5);

  const numbersString = '0123456789X ';
  this.coinFont = this.game.add.retroFont('font:numbers', 20, 26, numbersString, 6);
  this.heartFont = this.game.add.retroFont('font:numbers', 20, 26, numbersString, 6);

  let coinIcon = this.game.make.image(this.keyIcon.width + 7, 0, 'icon:coin');
  let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width, coinIcon.height / 2, this.coinFont);
  coinScoreImg.anchor.set(0, .5);

  let heartIcon = this.game.make.image(this.keyIcon.width + 110, 0, 'icon:heart');
  let heartLivesImg = this.game.make.image(heartIcon.x + heartIcon.width, heartIcon.height / 2, this.heartFont);
  heartLivesImg.anchor.set(0, .5);

  this.hud = this.game.add.group();
  this.hud.position.set(10, 10);
  this.hud.add(coinIcon);
  this.hud.add(coinScoreImg);
  this.hud.add(this.keyIcon);
  this.hud.add(heartIcon);
  this.hud.add(heartLivesImg);
};

GameWonState = {};

GameWonState.init = function(data) {
  this.keys = this.game.input.keyboard.addKeys({
    spacebar: Phaser.KeyCode.SPACEBAR,
    enter: Phaser.KeyCode.ENTER,
  });

  this.keys.spacebar.onDown.add(function() {
    this.sfx.startGame.play();
    this.game.state.start('play', true, false, {level: 0});
  }, this);

  this.keys.enter.onDown.add(function() {
    this.sfx.startGame.play();
    this.game.state.start('play', true, false, {level: 0});
  }, this);
};

GameWonState.create = function() {
  this.game.add.image(0, 0, 'background');
  this.awesomeText = this.game.add.image(this.game.world.width / 2, this.game.world.height / 4, 'text:awesome');
  this.awesomeText.anchor.set(.5, .5);
  this.youWinText = this.game.add.image(this.game.world.width / 2, this.game.world.height / 2.5, 'text:youWin');
  this.youWinText.anchor.set(.5, .5);
  this.playAgainText = this.game.add.button(this.game.world.width /2, this.game.world.height / 1.5, 'text:playAgain', playGame, this);
  this.playAgainText.anchor.set(.5, .5);
  this.madeByText = this.game.add.image(this.game.world.width / 1.1, this.game.world.height / 1.07, 'text:madeBy');
  this.madeByText.anchor.set(.5, .5);

  this.scoreText = this.game.add.image(this.game.world.width / 2.3, this.game.world.height / 1.8, 'text:score');
  this.scoreText.anchor.set(.5, .5);

  this.sfx = {
    startGame: this.game.add.audio('sfx:startGame'),
  }
};

GameOverState = {};

GameOverState.init = function(data) {
  this.keys = this.game.input.keyboard.addKeys({
    spacebar: Phaser.KeyCode.SPACEBAR,
    enter: Phaser.KeyCode.ENTER,
  });

  this.keys.spacebar.onDown.add(function() {
    this.sfx.startGame.play();
    this.game.state.start('play', true, false, {level: 0});
  }, this);

  this.keys.enter.onDown.add(function() {
    this.sfx.startGame.play();
    this.game.state.start('play', true, false, {level: 0});
  }, this);
};

GameOverState.create = function() {
  this.game.add.image(0, 0, 'background');
  this.gameOverText = this.game.add.image(this.game.world.width / 2, this.game.world.height / 2.5, 'text:gameOver');
  this.gameOverText.anchor.set(.5, .5);
  this.playAgainText = this.game.add.button(this.game.world.width /2, this.game.world.height / 1.5, 'text:playAgain', playGame, this);
  this.playAgainText.anchor.set(.5, .5);
  this.madeByText = this.game.add.image(this.game.world.width / 1.1, this.game.world.height / 1.07, 'text:madeBy');
  this.madeByText.anchor.set(.5, .5);

  this.scoreText = this.game.add.image(this.game.world.width / 2.3, this.game.world.height / 1.8, 'text:score');
  this.scoreText.anchor.set(.5, .5);

  this.sfx = {
    startGame: this.game.add.audio('sfx:startGame'),
  }
};

window.onload = function() {
  let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');

  game.state.add('load', LoadState);
  game.state.add('gameTitle', GameTitleState);
  game.state.add('controls', ControlsState);
  game.state.add('play', PlayState);
  game.state.add('gameWon', GameWonState);
  game.state.add('gameOver', GameOverState);
  game.state.start('load');
};