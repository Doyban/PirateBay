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
  // alert('hello');
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
      // alert('Interstitial ad finished successfully');
    })
    .catch(function(e) {
      // alert(e.message);
    });
}
