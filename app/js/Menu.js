(function (global) {
  var Menu = global.Menu = function () {};

  // Load menu assets.
  Menu.prototype.preload = function () {
    this.game.load.image('backgroundMenu', backgroundMenu); // Load image background.
  };

  // Create Menu once preload is complete.
  Menu.prototype.create = function () {
    // Add background.
    this.background = this.game.add.sprite(0, 0, 'backgroundMenu');
    this.background.name = 'backgroundGame';

    // Add Menu buttons.
    this.exitButton = this.game.add.button(this.game.world.width * 0.85, this.game.world.height * 0.03, "exit", this.startExit, this);
    this.inviteButton = this.game.add.button(this.game.world.width * 0.19, this.game.world.height * 0.3, "invite", this.startInvite, this);
    this.loginButton = this.game.add.button(this.game.world.width * 0.445, this.game.world.height * 0.3, "login", this.startLogin, this);
    this.shareButton = this.game.add.button(this.game.world.width * 0.7, this.game.world.height * 0.3, "share", this.startShare, this);
    this.playButton = this.game.add.button(this.game.world.width * 0.1, this.game.world.height * 0.5, "play", this.startPlay, this);
    this.storeButton = this.game.add.button(this.game.world.width * 0.6, this.game.world.height * 0.5, "store", this.startStore, this);

    localStorage.scoreRate = localStorage.scoreRate || 1; // Initialize scoreRate.

    this.displayMedal(); // Display appropriate medal.

    this.points = isNaN(this.points) ? this.points = '0' : this.points;

    // Points text.
    this.spriteShield = this.game.add.sprite(this.game.world.width * 0.1, this.game.world.height * 0.03, 'shield');
    this.pointsText = this.game.add.text(this.game.world.width * 0.17, this.game.world.height * 0.025, this.points.toString(), {
      align: 'right',
      fill: '#ffffff',
      font: '60px arcade_normalregular',
      stroke: '#535353',
      strokeThickness: 5
    });

    initAds(); // Init Messenger ads.
  };

  // Method to display medal based on player score.
  Menu.prototype.displayMedal = function () {
    // Add statistics.
    this.points = 0; // Set initial points to 0.

    (this.stages = this.stages || []).push(global.localStorage.getItem('lastRound')); // Push last round to stages and set it to variable.


    // Iterate through all stages.
    for (var i = 0; i < this.stages.length; i++) {
      // TODO: Remove bug when changing state stages are being added as well, most probably manage it with localStorage.
      this.points += parseInt(this.stages[i]); // Add points from each stage to points.
      // console.log(this.stages[i]); // Show past game rounds.
    }

    // Display appropriate medal according to player points.
    if (this.points <= 1) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal1');
    } else if (this.points <= 20) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal2');
    } else if (this.points <= 40) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal3');
    } else if (this.points <= 70) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal4');
    } else if (this.points <= 110) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal5');
    } else if (this.points <= 170) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal6');
    } else if (this.points <= 250) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal7');
    } else if (this.points <= 300) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal8');
    } else if (this.points <= 500) {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal9');
    } else {
      this.imageMedals = this.game.add.sprite(this.game.world.width * 0.03, this.game.world.height * 0.03, 'medal1');
    }
  };

  Menu.prototype.startExit = function () {
    exitGame();
  };

  Menu.prototype.startInvite = function () {
    inviteGame();
  };

  Menu.prototype.startLogin = function () {
    challengeGame();
  };

  Menu.prototype.startPlay = function () {
    this.game.state.start('Game'); // Start Game state.
  };

  Menu.prototype.startShare = function () {
    shareGame();
  };

  Menu.prototype.startStore = function () {
    this.game.state.start('Store'); // Start Store state.
  };
}(this));