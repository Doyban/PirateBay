//initialize the goodies
function initAd(){
  if ( window.plugins && window.plugins.AdMob ) {
    var ad_units = {
      ios : {
        banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',		//PUT ADMOB ADCODE HERE
        interstitial: 'ca-app-pub-4865595196880143/7784594919'	//PUT ADMOB ADCODE HERE
      },
      android : {
        banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',		//PUT ADMOB ADCODE HERE
        interstitial: 'ca-app-pub-4865595196880143/7784594919'	//PUT ADMOB ADCODE HERE
      }
    };
    var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;

    window.plugins.AdMob.setOptions( {
      publisherId: admobid.banner,
      interstitialAdId: admobid.interstitial,
      adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,	//use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
      bannerAtTop: false, // set to true, to put banner at top
      overlap: true, // banner will overlap webview 
      offsetTopBar: false, // set to true to avoid ios7 status bar overlap
      isTesting: false, // receiving test ad
      autoShow: false // auto show interstitial ad when loaded
    });

    window.plugins.AdMob.createInterstitialView();	//get the interstitials ready to be shown
    window.plugins.AdMob.requestInterstitialAd(); //get the next one ready only after the current one is closed

  } else {
    // alert('admob plugin not ready');
  }
}

//display the interstitial
function showInterstitialFunc(){
	window.plugins.AdMob.showInterstitialAd();
}