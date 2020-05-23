(function (global) {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDLzSeJe8ZFGkvGH69gjvQ7qmY9XjKYCSM",
    authDomain: "piratebay-67967.firebaseapp.com",
    databaseURL: "https://piratebay-67967.firebaseio.com",
    projectId: "piratebay-67967",
    storageBucket: "",
    messagingSenderId: "1048722473062"
  };
  firebase.initializeApp(config);

  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO); // Fit to all screens perfectly.

  // Add Phaser states.
  game.state.add('Preload', Preload);
  game.state.add('Menu', Menu);
  game.state.add('Game', Game);
  game.state.add('Store', Store);
  game.state.add('ShareScore', ShareScore);

  game.state.start('Preload'); // Start Preload state.
}(this));
