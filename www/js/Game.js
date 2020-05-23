(function (global) {
  var Game = global.Game = function (game) {};

  Game.prototype.create = function () {
    this.stage.disableVisibilityChange = true; // Continue game on lost focus in the window.

    this.createGame = true; // Create game.
    this.amountEnemies = 0; // Set initial amount of enemies to 0.

    // Background.
    this.background = this.game.add.sprite(0, 0, 'backgroundGame');

    // Target.
    this.target = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'target');
    this.target.anchor.setTo(0.5, 0.5);
    this.target.z = 1;
    this.groupGame = this.game.add.group();
    this.groupGame.enableBody = true;
    this.groupGame.physicsBodyType = Phaser.Physics.ARCADE;
    this.groupGame.add(this.target);

    // Score text.
    this.score = 0;
    this.spriteScore = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'score');
    this.scoreText = this.game.add.text(this.game.world.width * 0.122, this.game.world.height * 0.037, this.score, {
      align: 'right',
      fill: '#ffffff',
      font: '25px arcade_normalregular',
      stroke: '#535353',
      strokeThickness: 5
    });
    this.scoreTextTween = this.add.tween(this.scoreText.scale).to({x: 2, y: 2}, 100, Phaser.Easing.Linear.In).to({x: 1, y: 1}, 100, Phaser.Easing.Linear.In);

    // Round text.
    this.stage = 0;
    this.spriteRound = this.game.add.sprite(this.game.world.width * 0.2, this.game.world.height * 0.03, 'round');
    this.roundText = this.game.add.text(this.game.world.width * 0.25, this.game.world.height * 0.037, this.stage, {
      align: 'right',
      fill: '#ffffff',
      font: '25px arcade_normalregular',
      stroke: '#535353',
      strokeThickness: 5
    });
    this.roundTextTween = this.add.tween(this.roundText.scale).to({x: 2, y: 2}, 100, Phaser.Easing.Linear.In).to({x: 1, y: 1}, 100, Phaser.Easing.Linear.In);

    // Kills text.
    this.amountPirates = 0;
    this.spriteAmountPirates = this.game.add.sprite(this.game.world.width * 0.37, this.game.world.height * 0.03, 'pirates');
    this.amountPiratesText = this.game.add.text(this.game.world.width * 0.47, this.game.world.height * 0.037, this.amountPirates, {
      align: 'right',
      fill: '#ffffff',
      font: '25px arcade_normalregular',
      stroke: '#535353',
      strokeThickness: 5
    });
    this.amountPiratesTextTween = this.add.tween(this.amountPiratesText.scale).to({x: 2, y: 2}, 100, Phaser.Easing.Linear.In).to({x: 1, y: 1}, 100, Phaser.Easing.Linear.In);

    // Sounds.
    this.soundGame = this.game.add.audio('audioBackgroundGame');
    this.soundDeadPirate = this.game.add.audio('audioDeadPirate');
    this.soundGameOver = this.game.add.audio('audioGameOver');
    this.soundDeadEnemy = this.game.add.audio('audioDeadEnemy');

    // Sound buttons.
    this.buttonMusic = this.game.add.button(this.game.world.width * 0.83, this.game.world.height * 0.03, 'music', this.toggleBackgroundMusic, this);
    this.buttonMusicToggle = false;
    this.buttonAudio = this.game.add.button(this.game.world.width * 0.91, this.game.world.height * 0.03, 'audio', this.toggleGameAudio, this);
    this.buttonAudioToggle = false;

    this.soundGame.play('', 0, 1, true); // Play game music in the loop.
  };

  // Loop throughout game and update necessary stuff.
  Game.prototype.update = function () {
    this.hit(); // Call hit method.

    if (this.gameOver()) {
      return; // Return true if gameOver occured.
    }

    this.updateRound(); // Update round.
    this.updateTarget(); // Update target.

    this.groupGame.sort('y', Phaser.Group.SORT_ASCENDING);
  };

  // Punctuate statistics when Blue Enemy killed.
  Game.prototype.punctuateBlueEnemy = function () {
    this.amountEnemies -= 1; // Decrement amount of enemies.
    this.score += parseInt(localStorage.scoreRate) * 2; // Increment score.
    this.scoreTextTween.start(); // Start tween animation.
    this.scoreText.setText(this.score); // Set score text.
  };

  // Punctuate statistics when Green Enemy killed.
  Game.prototype.punctuateGreenEnemy = function () {
    this.amountEnemies -= 1; // Decrement amount of enemies.
    this.score += parseInt(localStorage.scoreRate) * 4; // Increment score.
    this.scoreTextTween.start(); // Start tween animation.
    this.scoreText.setText(this.score); // Set score text.
  };

  // Punctuate statistics when Red Enemy killed.
  Game.prototype.punctuateRedEnemy = function () {
    this.amountEnemies -= 1; // Decrement amount of enemies.
    this.score += parseInt(localStorage.scoreRate) * 5; // Increment score.
    this.scoreTextTween.start(); // Start tween animation.
    this.scoreText.setText(this.score); // Set score text.
  };

  // Punctuate statistics when White Enemy killed.
  Game.prototype.punctuateWhiteEnemy = function () {
    this.amountEnemies -= 1; // Decrement amount of enemies.
    this.score += parseInt(localStorage.scoreRate); // Increment score.
    this.scoreTextTween.start(); // Start tween animation.
    this.scoreText.setText(this.score); // Set score text.
  };

  // Punctuate statistics when Yellow Enemy killed.
  Game.prototype.punctuateYellowEnemy = function () {
    this.amountEnemies -= 1; // Decrement amount of enemies.
    this.score += parseInt(localStorage.scoreRate) * 3; // Increment score.
    this.scoreTextTween.start(); // Start tween animation.
    this.scoreText.setText(this.score); // Set score text.
  };

  // Play sound when Enemy killed.
  Game.prototype.playSoundDeadEnemy = function () {
    this.soundDeadEnemy.play(); // Play dead enemy sound.
  };

  // Update current stage.
  Game.prototype.stageMethod = function () {
    this.roundText.setText(++this.stage); // Set stage text.
    this.roundTextTween.start(); // Start tween animation.
  };

  // Update amount of pirates.
  Game.prototype.amountPiratesMethod = function (amountPirates) {
    this.amountPiratesText.setText(this.amountPirates += amountPirates); // Set amount of pirates text.
    this.amountPiratesTextTween.start(); // Start tween animation.
  };

  // Game over method.
  Game.prototype.gameOver = function () {
    this.game.lastScore = this.score; // Get last score.
    this.game.lastRound = this.stage; // Get last round.

    // Set last score and last round.
    global.localStorage.setItem('lastScore', this.game.lastScore);
    global.localStorage.setItem('lastRound', this.game.lastRound);

    // Check if there are no more pirates of the map.
    if (this.amountPirates === 0 && !this.createGame) {
      showInterstitialFunc(); // Show Messenger ads.

      // No more pirates on the map then the game is over.
      this.soundGameOver.play(); // Play game over sound.
      this.soundGame.stop(); // Stop playing background music.

      this.game.state.start('ShareScore'); // Start ShareScore state.
      localStorage.scoreRate = 1; // Set to default scoreRate on game over.

      return true;
    }
    return false;
  };

  // Hit method.
  Game.prototype.hit = function () {
    this.game.physics.arcade.overlap(this.groupGame, this.groupGame, this.collisionHandler, null, this); // Overlap pirates, enemies and handle collision.
  };

  // Collision handler method.
  Game.prototype.collisionHandler = function (obj1, obj2) {
    var pirate, enemy; // Set variables.

    // Check collisions between Pirate and every Enemy and set to appropriate object.
    if (obj1 instanceof Pirate && (obj2 instanceof BlueEnemy || obj2 instanceof GreenEnemy || obj2 instanceof RedEnemy || obj2 instanceof WhiteEnemy || obj2 instanceof YellowEnemy)) {
      pirate = obj1;
      enemy = obj2;
    } else if ((obj1 instanceof BlueEnemy || obj1 instanceof GreenEnemy || obj1 instanceof RedEnemy || obj1 instanceof WhiteEnemy || obj1 instanceof YellowEnemy) && obj2 instanceof Pirate) {
      pirate = obj2;
      enemy = obj1;
    }
    else {
      return;
    }

    // Check if pirate is alive on collision.
    if (pirate.alive) {
      pirate.killPirate(enemy); // Kill Pirate on collision.
      this.soundDeadPirate.play(); // Play dead pirate sound.
    }
  };

  // Initialize pirates.
  Game.prototype.initPirates = function () {
    var pirate = new Pirate(this); // Pirate constructor.

    this.groupGame.add(pirate); // Add pirates to the game.
    this.amountPiratesMethod(1); // Increment by 1 number of current pirates on the world in the HUD.
    this.createGame = false; // Don't create game while initializing Pirates.
  };

  Game.prototype.initEnemies = function (person) {
    // Constructors of enemies.
    var blueEnemy = new BlueEnemy(this, person);
    var greenEnemy = new GreenEnemy(this, person);
    var redEnemy = new RedEnemy(this, person);
    var whiteEnemy = new WhiteEnemy(this, person);
    var yellowEnemy = new YellowEnemy(this, person);

    // Add enemies to the game.
    this.groupGame.add(blueEnemy);
    this.groupGame.add(greenEnemy);
    this.groupGame.add(redEnemy);
    this.groupGame.add(whiteEnemy);
    this.groupGame.add(yellowEnemy);

    this.createGame = false; // Don't create game while adding enemies.

    // Check if Blue Enemy exists in the game.
    if (blueEnemy) {
      // Blue Enemy exists in the game.
      this.amountEnemies += 1; // Increment number of enemies.
    }
    // Check if Green Enemy exists in the game.
    else if (greenEnemy) {
      // Green Enemy exists in the game.
      this.amountEnemies += 1; // Increment number of enemies.
    }
    // Check if Red Enemy exists in the game.
    else if (redEnemy) {
      // Red Enemy exists in the game.
      this.amountEnemies += 1; // Increment number of enemies.
    }
    // Check if White Enemy exists in the game.
    else if (whiteEnemy) {
      // White Enemy exists in the game.
      this.amountEnemies += 1; // Increment number of enemies.
    }
    // Check if Yellow Enemy exists in the game.
    else if (yellowEnemy) {
      // Yellow Enemy exists in the game.
      this.amountEnemies += 1; // Increment number of enemies.
    }
  };

  // Update round method.
  Game.prototype.updateRound = function () {
    // Check if there are no more enemies.
    if (this.amountEnemies === 0) {
      // No more enemies on the map.
      this.stageMethod(); //
      this.amountEnemies = this.stage * 2; // Multiply amount of enemies depended by stage.
      this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 5, this.initPirates, this); // Initialize pirates to the map.
      this.game.time.events.repeat(Phaser.Timer.SECOND * 20, this.amountEnemies, this.initEnemies, this); // Initialize enemies to the map.
    }
  };

  // Update target method.
  Game.prototype.updateTarget = function () {
    // Set target coordinates to input coordinates.
    this.target.x = this.game.input.x;
    this.target.y = this.game.input.y;
  };

  // Toggle background music.
  Game.prototype.toggleBackgroundMusic = function () {
    this.soundGame.mute = !this.soundGame.mute; // Toggle background sound.
    this.buttonMusicToggle = !this.buttonMusicToggle; // Toggle background music button.
    this.buttonMusic.frame = (this.buttonMusicToggle) ? 1 : 0; // Show appropriate background music button.
  };

  // Toggle game audio.
  Game.prototype.toggleGameAudio = function () {
    this.buttonAudioToggle = !this.buttonAudioToggle; // Toggle game audio button.
    this.buttonAudio.frame = this.buttonAudioToggle ? 1 : 0; // Show appropriate background music button.
    this.soundDeadPirate.volume = this.buttonAudioToggle ? 0 : 1; //  Toggle dead pirate sound.
    this.soundGameOver.volume = this.buttonAudioToggle ? 0 : 1; // Toggle game over sound.
    this.soundDeadEnemy.volume = this.buttonAudioToggle ? 0 : 1; // Toggle game over sound.
  };
}(this));
