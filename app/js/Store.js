(function (global) {
  var Store = global.Store = function () {};

  Store.prototype.preload = function () {
    this.game.load.image('backgroundMenu', backgroundMenu); // Load image background.
  };

  Store.prototype.create = function () {
    // Add background.
    this.background = this.game.add.sprite(0, 0, 'backgroundMenu');
    this.background.name = 'backgroundMenu';

    // Add Store buttons.
    this.exitButton = this.game.add.button(this.game.world.width * 0.85, this.game.world.height * 0.03, 'exit', this.startMenu, this);
    this.scorex2Button = this.game.add.button(this.game.world.width * 0.2, this.game.world.height * 0.2, 'scorex2', this.startPaymentScorex2, this);
    this.scorex3Button = this.game.add.button(this.game.world.width * 0.55, this.game.world.height * 0.2, 'scorex3', this.startPaymentScorex3, this);
    this.scorex4Button = this.game.add.button(this.game.world.width * 0.2, this.game.world.height * 0.6, 'scorex4', this.startPaymentScorex4, this);
    this.scorex6Button = this.game.add.button(this.game.world.width * 0.55, this.game.world.height * 0.6, 'scorex6', this.startPaymentScorex6, this);
  };

  Store.prototype.startMenu = function () {
    this.game.state.start('Menu'); // Start Menu state.
  };

  Store.prototype.startPaymentScorex2 = function () {
    // TODO: Add behavior for this event.
    alert('score x2');
    localStorage.scoreRate = 2;
  };

  Store.prototype.startPaymentScorex3 = function () {
    // TODO: Add behavior for this event.
    alert('score x3');
    localStorage.scoreRate = 3;
  };

  Store.prototype.startPaymentScorex4 = function () {
    // TODO: Add behavior for this event.
    alert('score x4');
    localStorage.scoreRate = 4;
  };

  Store.prototype.startPaymentScorex6 = function () {
    // TODO: Add behavior for this event.
    alert('score x6');
    localStorage.scoreRate = 6;
  };
}(this));