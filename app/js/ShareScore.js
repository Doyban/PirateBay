(function (global) {
  var ShareScore = global.ShareScore = function () {
    ShareScore.prototype.preload = function () {
      this.game.load.image('backgroundMenu', backgroundMenu); // Load image background.
    };

    ShareScore.prototype.create = function () {
      // Add background.
      this.background = this.game.add.sprite(0, 0, 'backgroundMenu');
      this.background.name = 'backgroundMenu';

      // Add buttons.
      this.exitButton = this.game.add.button(this.game.world.width * 0.85, this.game.world.height * 0.03, 'exit', this.startMenu, this);
      this.shareButton = this.game.add.button(this.game.world.width * 0.34, this.game.world.height * 0.34, 'shareBig', this.startShare, this);

      // Get items from localStorage.
      this.lastScore = global.localStorage.getItem('lastScore');
      this.lastRound = global.localStorage.getItem('lastRound');
    };
  };

  ShareScore.prototype.startMenu = function () {
    this.game.state.start('Menu'); // Start Menu state.
  };

  ShareScore.prototype.startShare = function () {
    // TODO: Add behavior for this event.
    alert('lastScore is ' + this.lastScore + ' ; last round is ' + this.lastRound);
  };
})(this);