!function(e){(e.FirebaseAPI=function(){}).prototype.loginUser=function(){"use strict";var e=new firebase.auth.FacebookAuthProvider;firebase.auth().signInWithRedirect(e),firebase.auth().getRedirectResult().then(function(e){if(e.credential)e.credential.accessToken;e.user}).catch(function(e){e.code,e.message,e.email,e.credential})}}(this);