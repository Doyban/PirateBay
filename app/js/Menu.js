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
    this.inviteButton = this.game.add.button(this.game.world.width * 0.175, this.game.world.height * 0.2, "invite", this.startInvite, this);
    this.loginButton = this.game.add.button(this.game.world.width * 0.42, this.game.world.height * 0.2, "login", this.startLogin, this);
    this.shareButton = this.game.add.button(this.game.world.width * 0.675, this.game.world.height * 0.2, "share", this.startShare, this);
    this.playButton = this.game.add.button(this.game.world.width * 0.1, this.game.world.height * 0.45, "play", this.startPlay, this);
    this.storeButton = this.game.add.button(this.game.world.width * 0.6, this.game.world.height * 0.45, "store", this.startStore, this);

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
		
		initAd(); // Initialize AdMob.
  };

  // Method to display medal based on player score.
  Menu.prototype.displayMedal = function () {
    // Add statistics.
    this.points = 0; // Set initial points to 0.

    (this.stages = this.stages || []).push(global.localStorage.getItem('lastRound')); // Push last round to stages and set it to variable. TODO: Fix

    // Iterate through all stages.
    for (var i = 0; i < this.stages.length; i++) {
      this.points += parseInt(this.stages[i]); // Add points from each stage to points.
      // console.log(this.stages[i]); // Show past game rounds.
    }

    global.localStorage.setItem('lastRound', 0); // Reset lastRound to 0.

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
    // alert('exit');
		navigator.app.exitApp();
  };

  Menu.prototype.startInvite = function () {
    // alert('invite');

  	this.options = {
    	method: 'apprequests',
    	message: 'Play CashNinja with me!'
  	};
  	this.onSuccess = function(result) {
    	// alert("Success with invite");
  	};
  	this.onError = function(msg) {
    	// alert("Failed with invite");
  	};
    
  	facebookConnectPlugin.showDialog(this.options, this.onSuccess, this.onError);
  };

  Menu.prototype.startLogin = function () {
		// alert('login');
		
    global.FirebaseAPI.prototype.loginUser(); // Log in user through Firebase.
  };

  Menu.prototype.startPlay = function () {
    this.game.state.start('Game'); // Start Game state.
  };

  Menu.prototype.startShare = function () {
    // alert('share');
		
		this.options = {
			message: 'Play PirateBay!', // not supported on some apps (Facebook, Instagram)
			subject: 'Play PirateBay!', // fi. for email
			files: ['https://doyban.com/wp-content/uploads/2017/08/piratebay.png', 'https://doyban.com/logos/piratebay.png'], // an array of filenames either locally or remotely
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

  Menu.prototype.startStore = function () {
    this.game.state.start('Store'); // Start Store state.
  };
}(this));