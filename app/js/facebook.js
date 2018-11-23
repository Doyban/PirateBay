(function (global) {
  // Required methods to open Messenger game.
  FBInstant.initializeAsync();
  FBInstant.setLoadingProgress(100); // Assets are 50% loaded
  FBInstant.startGameAsync();
}(this));
