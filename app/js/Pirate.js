(function (global) {
  var Pirate = global.Pirate = function (state) {
    this.state = state;
    this.game = state.game;

    var pos = this.rand(); // Call method to randomly choose X and Y coordinates.

    // Set X and Y coordinate returned from rand method.
    var x = pos.x;
    var y = pos.y;

    var animation;

    // Choose appropriate sailing animation dependent by X coordinate.
    if (x < 0) {
      animation = 'sailing-right';
    } else {
      animation = 'sailing-left';
    }

    Phaser.Sprite.call(this, state.game, x, y, 'pirate'); // Call pirate sprite.

    // Add sailing animations.
    this.animations.add('sailing-left', Phaser.Animation.generateFrameNames('sailing-left-', 0, 11, '.png', 0), 3, true, false); // Play animation in loop.
    this.animations.add('sailing-right', Phaser.Animation.generateFrameNames('sailing-right-', 0, 11, '.png', 0), 3, true, false); // Play animation in loop.

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

    this.checkWorldBounds = true; // Check world bounds.
    this.events.onOutOfBounds.add(this.boundOut, this); // Call boundOut if sprite leaves the world.

    // Check where is initial X coordinate.
    if (this.x < 0) {
      // Initial X coordinate is on the left from the world.
      this.body.velocity.x = this.game.rnd.integerInRange(40, 100); // Set to sailing from left to right.
      this.body.velocity.y = 0; // Don't move in the Y coordinate.
    } else {
      // Initial X coordinate is on the right from the world.
      this.body.velocity.x = -this.game.rnd.integerInRange(40, 100); // Set to sailing from right to left.
      this.body.velocity.y = 0; // Don't move in the Y coordinate.
    }
  };

  // Set up constructor.
  Pirate.prototype = Object.create(Phaser.Sprite.prototype);
  Pirate.prototype.constructor = Pirate;

  Pirate.prototype.boundOut = function (pirate) {
    var pos = this.rand(true); // Call method to randomly choose X and Y coordinates.

    // Set X and Y coordinate returned from rand method.
    this.x = pos.x;
    this.y = pos.y;
  };

  Pirate.prototype.killPirate = function (enemy) {
    this.alive = false; // Pirate is dead.
    // console.log(enemy.body.velocity.x);

    // Pirate is sailing from right to left.
    if (this.body.velocity.x < 0) {
      // Stop the pirate, must be here, otherwise this.body.velocity.x would be always 0.
      enemy.body.velocity.x = 0; // Stop enemy while killing Pirate.

      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      // Play shooting and sinking animation, sinking animation is done once shooting animation will be finished.
      this.animations.play('shooting-left', null, false, false) // Play shooting left animation.
        .onComplete.add(function () {
        this.animations.play('sinking-left', null, false, true); // Play sinking left animation.
        enemy.destroy(true); // Kill enemy.
      }, this);
    }
    // Pirate is sailing from left to right.
    else if (this.body.velocity.x > 0) {
      enemy.body.velocity.x = 0; // Stop enemy while killing Pirate.

      // Stop the pirate, must be here, otherwise this.body.velocity.x would be always 0.
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      // Play shooting and sinking animation, sinking animation is done once shooting animation will be finished.
      this.animations.play('shooting-right', null, false, false) // Play shooting right animation.
        .onComplete.add(function () {
        this.animations.play('sinking-right', null, false, true); // Play sinking right animation.
        enemy.destroy(true); // Kill enemy.
      }, this);
    } else {
      return;
    }

    this.state.amountPiratesMethod(-1); // Decrement by 1 number of current pirates on the world in the HUD.
  };

  // Randomly choose X and Y coordinates.
  Pirate.prototype.rand = function (wrap) {
    var x, y, r;

    if (wrap) {
      x = this.x < 0 ? 800 : -50; // Set X coordinate to 700 if X coordinate is less than 0 or -50 otherwise.
    } else {
      x = this.game.rnd.pick([-50, 800]); // Return random number between -50 and 700 for X coordinate.
    }

    r = this.game.rnd.integerInRange(0, 4); // Return random number between 0 and 4 for radius.
    y = 80 + (400 - 80) / 6 * r; // Calculate Y coordinate.
    return {x: x, y: y}; // Return X and Y coordinate.
  };
}(this));