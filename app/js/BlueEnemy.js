(function (global) {
  var BlueEnemy = global.BlueEnemy = function (state, pirate) {
    this.game = state.game;
    this.state = state;

    var x, y, animation;

    if (pirate) {
      x = pirate.x;
      y = pirate.y;
    } else {
      var pos = this.rand(); // Call method to randomly choose X and Y coordinates.

      // Set X and Y coordinate returned from rand method.
      x = pos.x;
      y = pos.y;
    }

    // Choose appropriate sailing animation dependent by X coordinate.
    if (x < 0) {
      animation = 'sailing-right';
    } else {
      animation = 'sailing-left';
    }

    Phaser.Sprite.call(this, state.game, x, y, 'blueEnemy'); // Call Blue Enemy sprite.

    // Add sailing animations.
    this.animations.add('sailing-left', Phaser.Animation.generateFrameNames('sailing-left-', 0, 11, '.png', 0), 4, true, false); // Play animation in loop.
    this.animations.add('sailing-right', Phaser.Animation.generateFrameNames('sailing-right-', 0, 11, '.png', 0), 4, true, false); // Play animation in loop.

    // Add shooting animations.
    this.animations.add('shooting-left', Phaser.Animation.generateFrameNames('shooting-left-', 0, 7, '.png', 0), 4, false, false); // Play animation once.
    this.animations.add('shooting-right', Phaser.Animation.generateFrameNames('shooting-right-', 0, 7, '.png', 0), 4, false, false); // Play animation once.

    // Add sinking animations.
    this.animations.add('sinking-left', Phaser.Animation.generateFrameNames('sinking-left-', 0, 7, '.png', 0), 4, false, false); // Play animation once.
    this.animations.add('sinking-right', Phaser.Animation.generateFrameNames('sinking-right-', 0, 7, '.png', 0), 4, false, false); // Play animation once.

    this.animations.play(animation); // Play sailing animation.

    // Physics values.
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.setSize(30, 30);

    this.inputEnabled = true; // Enable input events.
    this.events.onInputDown.add(this.killBlueEnemy, this); // Kill Blue Enemy on input down.

    this.checkWorldBounds = true; // Check world bounds.
    this.events.onOutOfBounds.add(this.boundOut, this); // Call boundOut if sprite leaves the world.

    var test = 'test';

    // Check where is initial X coordinate.
    if (x < 0) {
      // Initial X coordinate is on the left from the world.
      this.body.velocity.x = this.game.rnd.integerInRange(50, 150); // Set to sailing from left to right.
      this.body.velocity.y = 0; // Don't move in the Y coordinate.
    } else {
      // Initial X coordinate is on the right from the world.
      this.body.velocity.x = -this.game.rnd.integerInRange(50, 150); // Set to sailing from right to left.
      this.body.velocity.y = 0; // Don't move in the Y coordinate.
    }
  };

  // Set up constructor.
  BlueEnemy.prototype = Object.create(Phaser.Sprite.prototype);
  BlueEnemy.prototype.constructor = BlueEnemy;

  // Loop througout game.
  BlueEnemy.prototype.update = function () {
    // Check if Blue Enemy is dead.
    if (!this.alive) {
      this.destroy(); // Destroy Blue Enemy.
    }
  };

  BlueEnemy.prototype.killBlueEnemy = function () {
    this.health--; // Decrease health to be under 0 from its default value.
    // this.soundDeadEnemy.play(); // Play dead enemy sound.

    // Check if health is under 0, which means Enemy is dead.
    if (this.health <= 0) {

      this.inputEnabled = false; // Disable input events.

      // Blue Enemy is moving from right to left.
      if (this.body.velocity.x < 0) {
        // Stop the pirate, must be here, otherwise this.body.velocity.x would be always 0.
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        // Play shooting and sinking animation, sinking animation is done once shooting animation will be finished.
        this.animations.play('shooting-left', null, false, false) // Play shooting left animation.
          .onComplete.add(function () {
          this.animations.play('sinking-left', null, false, true); // Play sinking left animation.
        }, this);
      }
      // Blue Enemy is sailing from left to right.
      else {
        // Stop the pirate, must be here, otherwise this.body.velocity.x would be always 0.
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        // Play shooting and sinking animation, sinking animation is done once shooting animation will be finished.
        this.animations.play('shooting-right', null, false, false) // Play shooting right animation.
          .onComplete.add(function () {
          this.animations.play('sinking-right', null, false, true); // Play sinking right animation.
        }, this);
      }

      this.state.punctuateBlueEnemy(); // Update HUD.
      this.state.playSoundDeadEnemy(); // Play dead enemy sound.
    }
  };

  BlueEnemy.prototype.boundOut = function (pirate) {
    var pos = this.rand(true);  // Call method to randomly choose X and Y coordinates.

    // Set X and Y coordinate returned from rand method.
    this.x = pos.x;
    this.y = pos.y;
  };

  // Randomly choose X and Y coordinates.
  BlueEnemy.prototype.rand = function (wrap) {
    var x, y, r;

    if (wrap) {
      x = this.x < 0 ? 700 : -50; // Set X coordinate to 700 if X coordinate is less than 0 or -50 otherwise.
    } else {
      x = this.game.rnd.pick([-50, 700]); // Return random number between -50 and 700 for X coordinate.
    }

    r = this.game.rnd.integerInRange(0, 7); // Return random number between 0 and 7 for radius.
    y = 80 + (400 - 80) / 5 * r; // Calculate Y coordinate.
    return {x: x, y: y}; // Return X and Y coordinate.
  };
}(this));