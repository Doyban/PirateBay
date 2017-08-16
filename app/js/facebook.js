window.fbAsyncInit = function() {
  FB.init({
    appId      : '472430283121874',
    xfbml      : true,
    version    : 'v2.10'
  });

  // ADD ADDITIONAL FACEBOOK CODE HERE
  function onLogin(response) {
    if (response.status === 'connected') {
      FB.api('/me?fields=first_name', function(data) {
        // console.log("This is " + data.name);
      });
    }
  }

  // Check user login status.
  FB.getLoginStatus(function(response) {
    // Check login status on load, and if the user is
    // already logged in, go directly to the welcome message.
    if (response.status === 'connected') {
      onLogin(response);
      // console.log("connected");
      // console.log("Access token: " + response.authResponse.accessToken);
    } else {
      // Otherwise, show Login dialog first.
      FB.login(function(response) {
        onLogin(response);
        // console.log("showing login dialog");
      }, {scope: 'user_friends, email'});
    }
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
