(function (global) {
  var FirebaseAPI = global.FirebaseAPI = function () {};

  FirebaseAPI.prototype.loginUser = function () {
    "use strict";
    var provider = new firebase.auth.FacebookAuthProvider(); // Create an instance of the Facebook provider object.

    firebase.auth().signInWithRedirect(provider); // Sign in by redirecting to the sign-in page.

    // Retrieve Facebook provider's OAuth token.
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        console.log(token);
        console.log(result.credential);
        console.log(result);
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      console.log(error);
      var errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      console.log(email);
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(credential);
      // ...
    });
  }
}(this));