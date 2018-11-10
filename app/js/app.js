(function (global) {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'body');

  // Add Phaser states.
  game.state.add('Preload', Preload);
  game.state.add('Menu', Menu);
  game.state.add('Game', Game);
  game.state.add('Store', Store);
  game.state.add('ShareScore', ShareScore);

  game.state.start('Preload'); // Start Preload state.
}(this));