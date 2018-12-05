var preloadedInterstitial = null;

// Initialize Messenger SDK.
(function initSDK() {
  // Required methods to open Messenger game.
  FBInstant.initializeAsync();
  FBInstant.setLoadingProgress(100); // Assets are 50% loaded
  FBInstant.startGameAsync();
}());

// Initialize Messenger ads.
function initAds() {
  FBInstant.getInterstitialAdAsync(
    '327736978026913_335734790560465' // Your Ad Placement Id
  ).then(function(interstitial) {
    // Load the Ad asynchronously
    preloadedInterstitial = interstitial;
    return preloadedInterstitial.loadAsync();
  }).then(function() {
    // alert('Interstitial preloaded');
  }).catch(function(err){
    // alert('Interstitial failed to preload: ' + err.message);
  });
}

// Initialize code to display ads.
function showAds() {
  preloadedInterstitial.showAsync()
    .then(function() {
      // Perform post-ad success operation
    })
    .catch(function(e) {
      // alert(e.message);
    });
}

// Quit game.
function exitGame() {
  FBInstant.quit();
}

// Invite friends.
function inviteGame() {
  FBInstant.shareAsync({
    intent: 'INVITE',
    image: 'http://doyban.com/logos/piratebay.png',
    text: 'Play PirateBay on Messenger!',
    data: { myReplayData: '...' }
  }).then(function() {
    // continue with the game.
  });
}

// Share game.
function shareGame() {
  FBInstant.shareAsync({
    intent: 'SHARE',
    image: 'http://doyban.com/logos/piratebay.png',
    text: 'Play PirateBay on Messenger!',
    data: { myReplayData: '...' }
  }).then(function() {
    // continue with the game.
  });
}

// Challenge users, replacement for login.
function challengeGame() {
  FBInstant.shareAsync({
    intent: 'CHALLENGE',
    image: 'http://doyban.com/logos/piratebay.png',
    text: 'Challenge for you! PirateBay!',
    data: { myReplayData: '...' }
  }).then(function() {
    // continue with the game.
  });
}

// Share highscore.
function shareHighscore() {

}