(function (global) {
  var Preload = global.Preload = function () {};

  Preload.prototype = {
    // Initialize settings before preload starts.
    init: function () {
      // Scale page to fill full screen size.
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.refresh();
    },

    // Load game assets before game starts.
    preload: function preload() {
      // Load sprite sheets with its metadata in JSON.
      this.load.atlasJSONArray('pirate',      spriteSheetImagePirate,       spriteSheetJSONPirate);
      this.load.atlasJSONArray('blueEnemy',   spriteSheetImageBlueEnemy,    spriteSheetJSONBlueEnemy);
      this.load.atlasJSONArray('greenEnemy',  spriteSheetImageGreenEnemy,   spriteSheetJSONGreenEnemy);
      this.load.atlasJSONArray('redEnemy',    spriteSheetImageRedEnemy,     spriteSheetJSONRedEnemy);
      this.load.atlasJSONArray('yellowEnemy', spriteSheetImageYellowEnemy,  spriteSheetJSONYellowEnemy);
      this.load.atlasJSONArray('whiteEnemy',  spriteSheetImageWhiteEnemy,   spriteSheetJSONWhiteEnemy);

      // Sprites.
      this.load.image('shield', spriteShield);
      this.load.image('target', spriteTarget);
      this.load.image('score', spriteScore);
      this.load.image('round', spriteRound);
      this.load.image('pirates', spritePirates);

      // Buttons.
      this.load.image('exit', buttonExit);
      this.load.image('invite', buttonInvite);
      this.load.image('login', buttonLogin);
      this.load.image('play', buttonPlay);
      this.load.image('share', buttonShare);
      this.load.image('shareBig', buttonShareBig);
      this.load.image('store', buttonStore);
      this.load.image('scorex2', buttonScoreX2);
      this.load.image('scorex3', buttonScoreX3);
      this.load.image('scorex4', buttonScoreX4);
      this.load.image('scorex6', buttonScoreX6);

      // Background.
      this.load.image('backgroundGame', backgroundGame);

      // Medals.
      this.load.image('medal1', imageMedal1);
      this.load.image('medal2', imageMedal2);
      this.load.image('medal3', imageMedal3);
      this.load.image('medal4', imageMedal4);
      this.load.image('medal5', imageMedal5);
      this.load.image('medal6', imageMedal6);
      this.load.image('medal7', imageMedal7);
      this.load.image('medal8', imageMedal8);
      this.load.image('medal9', imageMedal9);

      // Sounds spritesheets.
      this.game.load.spritesheet('audio', 'asset/audio.png', 49, 49);
      this.game.load.spritesheet('music', 'asset/music.png', 49, 49);

      // Audios.
      this.load.audio('audioBackgroundGame', [audioBackgroundGameOGG, audioBackgroundGameMP3]);
      this.load.audio('audioDeadPirate', [audioDeadPirateOGG, audioDeadPirateMP3]);
      this.load.audio('audioDeadEnemy', [audioDeadEnemyOGG, audioDeadEnemyMP3]);
      this.load.audio('audioGameOver', [audioGameOverOGG, audioGameOverMP3]);
    },

    // Create game.
    create: function () {
      this.state.start('Menu'); // Start Menu state.
    }
  };
}(this));
