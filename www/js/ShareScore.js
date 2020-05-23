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
      this.shareButton = this.game.add.button(this.game.world.width * 0.34, this.game.world.height * 0.24, 'shareBig', this.startShare, this);

      // Get items from localStorage.
      this.lastScore = global.localStorage.getItem('lastScore');
      this.lastRound = global.localStorage.getItem('lastRound');
    };
  };

  ShareScore.prototype.startMenu = function () {
    this.game.state.start('Menu'); // Start Menu state.
  };

  ShareScore.prototype.startShare = function () {
    // alert('lastScore is ' + this.lastScore + ' ; last round is ' + this.lastRound);
    
    this.options = {
      message: 'Play PirateBay!', // not supported on some apps (Facebook, Instagram)
      subject: 'My score in PirateBay is ' + this.lastScore + " in " + this.lastRound + " round!", // fi. for email
      files: ['app/asset/logo.png'], // an array of filenames either locally or remotely
      url: 'https://doyban.com/piratebay/'
    };
    this.onSuccess = function(result) {
      // alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      // alert("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };
    this.onError = function(msg) {
      // alert("Sharing failed with message: " + msg);
    };

    window.plugins.socialsharing.shareWithOptions(this.options, this.onSuccess, this.onError);
  };
})(this);
